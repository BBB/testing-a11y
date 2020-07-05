import { v4 } from "uuid";
import { a11yOrTest } from "./a11yOrTest";
import { joinPrefix, join } from "./TestPrefixContext";

const testIDToUUID = new Map<string, string[]>();

const getUUID = (map = testIDToUUID) => (value: string, ix: number = 0) => {
  const list = getAllTestIdsForTestId(map)(value);
  if (list[ix]) {
    return list[ix];
  }
  map.set(value, [...list.slice(0, ix), v4(), ...list.slice(ix + 1)]);
  return map.get(value)![ix];
};

const isUndefined = (arg: any): arg is undefined => {
  return typeof arg === "undefined";
};

export const getAllTestIdsForTestId = (map = testIDToUUID) => (
  testID: string
) => map.get(testID) || [];

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
  if ((!!testID && !!a11yLabel) || !!testID) {
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
