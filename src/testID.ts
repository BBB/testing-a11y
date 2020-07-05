import { v4 } from "uuid";
import { a11yOrTest } from "./a11yOrTest";
import { joinPrefix } from "./TestPrefixContext";

const testIDToUUID = new Map<string, string[]>();

const getUUID = (map = testIDToUUID) => (value: string, ix: number = 0) => {
  const list = map.get(value) || [];
  if (list[ix]) {
    return list[ix];
  }
  map.set(value, [...list.slice(0, ix), v4(), ...list.slice(ix + 1)]);
  return map.get(value)![ix];
};

export const testID = (
  isAndroid: () => boolean,
  isA11yMode: () => boolean,
  map?: typeof testIDToUUID
) => (
  testID: string | undefined,
  a11yLabel: string | undefined,
  ix?: number | undefined
) => {
  let value = a11yLabel;
  if ((!!testID && !!a11yLabel) || !!testID) {
    const testIDAndPrefix = joinPrefix(testID);
    value = a11yOrTest(isA11yMode)(
      getUUID(map)(testIDAndPrefix, ix),
      a11yLabel
    );
    if (!value) {
      return {};
    }
  }
  return isAndroid()
    ? { accessible: true, accessibilityLabel: value }
    : { testID: value };
};
