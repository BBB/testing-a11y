import { v4 } from "uuid";
import { a11yOrTest } from "./a11yOrTest";
import { joinPrefix } from "./TestPrefixContext";

const testIDToUUID = new Map<string, string>();

const getUUID = (map = testIDToUUID) => (value: string) => {
  if (map.has(value)) {
    return map.get(value);
  }
  map.set(value, v4());
  return map.get(value);
};

export const testID = (
  isAndroid: () => boolean,
  isA11yMode: () => boolean,
  map?: typeof testIDToUUID
) => (testID: string | undefined, a11yLabel: string | undefined) => {
  let value = a11yLabel;
  if ((!!testID && !!a11yLabel) || !!testID) {
    const testIDAndPrefix = joinPrefix(testID);
    value = a11yOrTest(isA11yMode)(getUUID(map)(testIDAndPrefix), a11yLabel);
    if (!value) {
      return {};
    }
  }
  return isAndroid()
    ? { accessible: true, accessibilityLabel: value }
    : { testID: value };
};
