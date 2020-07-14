import { v4 } from "uuid";
import { join, joinPrefix } from "./TestPrefixContext";

export type TestIDs = Map<string, { uuid: string; indices: number[] }>;
export const testIDToUUID: TestIDs = new Map();

export const formatIx = (uuid: string, ix: number) => `${uuid}-${ix}`;

const DEFAULT_IX = -1;
const getUUID = (map = testIDToUUID) => (
  value: string,
  ix: number = DEFAULT_IX
) => {
  const list = map.get(value);
  if (list && list.indices.includes(ix)) {
    if (ix === DEFAULT_IX) {
      return list.uuid;
    }
    return formatIx(list.uuid, ix);
  }
  map.set(value, {
    uuid: list?.uuid || v4(),
    indices: [...(list?.indices || []), ix],
  });
  const uuid = map.get(value)!.uuid;
  if (ix === DEFAULT_IX) {
    return uuid;
  }
  return formatIx(uuid, ix);
};

export interface PossiblyBuilt {
  (
    ...args: [string, number] | [number, string] | [number] | [string] | []
  ): PossiblyBuilt;

  a11y: A11y<any>;
  asProps: A11y<any>["asProps"];
  asTestID: A11y<any>["asTestID"];
}

export const a11yOf = <T extends (value: A11y<T>) => any>(
  propFormatter: T,
  map?: TestIDs
) => (testID: string | undefined, a11yLabel?: string | undefined) => {
  const circ = function (
    ...args: [string, number] | [number, string] | [number] | [string] | []
  ) {
    (circ as any).a11y = new A11y(
      propFormatter,
      map,
      testID,
      a11yLabel,
      Array.from(args).find((a) => typeof a === "number") as number | undefined,
      Array.from(args).find((a) => typeof a === "string") as string | undefined
    );

    return circ as PossiblyBuilt;
  };
  (circ as any).a11y = new A11y(
    propFormatter,
    map,
    testID,
    a11yLabel,
    undefined,
    undefined
  );
  (circ as any).asProps = function (this: PossiblyBuilt) {
    return this.a11y.asProps();
  };
  (circ as any).asTestID = function (this: PossiblyBuilt) {
    return this.a11y.asTestID();
  };
  return (circ as unknown) as PossiblyBuilt;
};

export class A11y<T extends (value: A11y<T>) => any> {
  constructor(
    private propFormatter: T,
    private map: TestIDs | undefined,
    public testID: string | undefined,
    public a11yLabel: string | undefined,
    private ix: number | undefined,
    private prefix: string | undefined,
    private final = false
  ) {}

  static finalise<T extends (value: A11y<T>) => any>(
    propFormatter: T,
    map: TestIDs | undefined,
    testID: string | undefined,
    a11yLabel: string | undefined
  ) {
    return new A11y(
      propFormatter,
      map,
      testID,
      a11yLabel,
      undefined,
      undefined,
      true
    );
  }

  finalise() {
    if (this.final) {
      throw new Error("Already built");
    }
    const testID = !!this.testID
      ? getUUID(this.map)(
          joinPrefix(this.testID) === this.testID
            ? join(this.prefix, this.testID)
            : joinPrefix(this.testID),
          this.ix
        )
      : undefined;
    return A11y.finalise(this.propFormatter, this.map, testID, this.a11yLabel);
  }

  public asProps() {
    return this.propFormatter(this.finalise());
  }
  public asTestID() {
    const testID = this.finalise().testID;
    if (isUndefined(testID)) {
      throw new Error("No TestID supplied");
    }
    return testID;
  }
}

const isUndefined = (arg: any): arg is undefined => {
  return typeof arg === "undefined";
};
