import { v4 } from "uuid";
import { join, joinPrefix } from "./TestPrefixContext";

export const testIDToUUID = new Map<
  string,
  { uuid: string; indices: number[] }
>();

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
    return `${list.uuid}-${ix}`;
  }
  map.set(value, {
    uuid: list?.uuid || v4(),
    indices: [...(list?.indices || []), ix],
  });
  const uuid = map.get(value)!.uuid;
  if (ix === DEFAULT_IX) {
    return uuid;
  }
  return `${uuid}-${ix}`;
};

export const a11yBuilder = (
  testID: string | undefined,
  a11yLabel?: string | undefined
) => (
  ...args: [string, number] | [number, string] | [number] | [string] | []
) =>
  new Built(
    testID,
    a11yLabel,
    Array.from(args).find((a) => typeof a === "number") as number | undefined,
    Array.from(args).find((a) => typeof a === "string") as string | undefined
  );

export class Built {
  constructor(
    public testID: string | undefined,
    public a11yLabel: string | undefined,
    private ix: number | undefined,
    private prefix: string | undefined,
    private final = false
  ) {}

  static finalise(testID: string | undefined, a11yLabel: string | undefined) {
    return new Built(testID, a11yLabel, undefined, undefined, true);
  }

  finalise(map?: typeof testIDToUUID) {
    if (this.final) {
      throw new Error("Already built");
    }
    const testID = !!this.testID
      ? getUUID(map)(
          joinPrefix(this.testID) === this.testID
            ? join(this.prefix, this.testID)
            : joinPrefix(this.testID),
          this.ix
        )
      : undefined;
    return Built.finalise(testID, this.a11yLabel);
  }
}

export type NotBuilt = ReturnType<typeof a11yBuilder>;
export type PossiblyBuilt = Built | NotBuilt;
