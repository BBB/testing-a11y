import { v4 } from "uuid";
import { join, joinPrefix } from "./TestPrefixContext";

const testIDToUUID = new Map<string, { uuid: string; indices: number[] }>();

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

const isUndefined = (arg: any): arg is undefined => {
  return typeof arg === "undefined";
};

export const getAllTestIdsForTestId = (map = testIDToUUID) => (
  testID: string
) => {
  const list = map.get(testID);
  if (!list) {
    throw new Error(`Nothing found for id: ${testID} in map: ${map}`);
  }
  const uuid = list.uuid;
  if (list.indices.length === 1 && list.indices[0] === -1) {
    return [uuid];
  }
  return list.indices.map((ix) => `${uuid}-${ix}`) || [];
};

export const formatReactNative = (
  isA11y: () => boolean,
  isAndroid: () => boolean
) => (built: Built) => {
  if (isA11y()) {
    return formatA11y()(built.a11yLabel);
  }
  if (isAndroid()) {
    return formatTestIDAndroid()(built.testID);
  }
  return formatTestIDDefault()(built.testID);
};

export const formatA11y = () => (value: string | undefined) =>
  isUndefined(value)
    ? {}
    : {
        accessible: true,
        accessibilityLabel: value,
      };
export const formatTestIDAndroid = () => formatA11y();
export const formatTestIDDefault = () => (value: string | undefined) =>
  isUndefined(value) ? {} : { testID: value };

export const a11y = <T extends (value: Built) => any, R = ReturnType<T>>(
  propFormatter: T,
  map?: typeof testIDToUUID
) => (built: Built): R => {
  return propFormatter(built.finalise(map));
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

class Built {
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

type NotBuilt = ReturnType<typeof a11yBuilder>;
type PossiblyBuilt = Built | NotBuilt;

export const a11yProps = <T extends (value: Built) => any>(
  propFormatter: T,
  map?: typeof testIDToUUID
) => (possiblyBuilt: PossiblyBuilt) => {
  const built =
    typeof possiblyBuilt === "function" ? possiblyBuilt() : possiblyBuilt;
  return a11y(propFormatter, map)(built);
};

export const a11yID = <T extends (value: Built) => any>(
  propFormatter: T,
  map?: typeof testIDToUUID
) => (value: string) => a11yBoth(propFormatter, map)(value, undefined);

export const a11yLabel = <T extends (value: Built) => any>(
  propFormatter: T,
  map?: typeof testIDToUUID
) => (value: string) => a11yBoth(propFormatter, map)(undefined, value);

export const a11yBoth = <T extends (value: Built) => any>(
  propFormatter: T,
  map?: typeof testIDToUUID
) => (testID: string | undefined, a11yLabel: string | undefined) =>
  a11y(propFormatter, map)(a11yBuilder(testID, a11yLabel)());
