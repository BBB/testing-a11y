import { v4 } from "uuid";
import { a11yOrTest } from "./a11yOrTest";
import { joinPrefix, join } from "./TestPrefixContext";

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
    return uuid;
  }
  return list.indices.map((ix) => `${uuid}-${ix}`) || [];
};

export const formatAndroid = () => (value: string | undefined) =>
  isUndefined(value)
    ? {}
    : {
        accessible: true,
        accessibilityLabel: value,
      };
export const formatDefault = () => (value: string | undefined) =>
  isUndefined(value) ? {} : { testID: value };

export const a11yBoth = <
  T extends (value: string | undefined) => any,
  R = ReturnType<T>
>(
  propFormatter: T,
  isA11yMode: () => boolean,
  map?: typeof testIDToUUID
) => (
  testID: string | undefined,
  a11yLabel: string | undefined,
  ix?: number | undefined
): R => {
  let value = a11yLabel;
  if (!!testID) {
    const testIDAndPrefix = joinPrefix(testID);
    value = a11yOrTest(isA11yMode)(
      getUUID(map)(testIDAndPrefix, ix),
      a11yLabel
    );
  }
  return propFormatter(value);
};

export const a11yBuilder = (
  testID: string | undefined,
  a11yLabel?: string | undefined
) => (
  ...args: [string, number] | [number, string] | [number] | [string] | []
) => ({
  testID,
  a11yLabel,
  ix: Array.from(args).find((a) => typeof a === "number") as number | undefined,
  prefix: Array.from(args).find((a) => typeof a === "string") as
    | string
    | undefined,
});

export const a11yProps = <T extends (value: string | undefined) => any>(
  propFormatter: T,
  isA11yMode: () => boolean,
  map?: typeof testIDToUUID
) => (
  built:
    | ReturnType<typeof a11yBuilder>
    | ReturnType<ReturnType<typeof a11yBuilder>>
) => {
  const finished = typeof built === "function" ? built() : built;
  return a11yBoth(propFormatter, isA11yMode, map)(
    join(finished.prefix, finished.testID),
    finished.a11yLabel,
    finished.ix
  );
};

export const a11yID = <T extends (value: string | undefined) => any>(
  propFormatter: T,
  isA11yMode: () => boolean,
  map?: typeof testIDToUUID
) => (value: string) =>
  a11yBoth(propFormatter, isA11yMode, map)(value, undefined);

export const a11yLabel = <T extends (value: string | undefined) => any>(
  propFormatter: T,
  isA11yMode: () => boolean,
  map?: typeof testIDToUUID
) => (value: string) =>
  a11yBoth(propFormatter, isA11yMode, map)(undefined, value);
