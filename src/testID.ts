import { a11yOrTest } from "./a11yOrTest";

export const testID = (isAndroid: () => boolean, isA11yMode: () => boolean) => (
  testID: string | undefined,
  a11yLabel: string | undefined
) => {
  let value = a11yLabel;
  if ((!!testID && !!a11yLabel) || !!testID) {
    value = a11yOrTest(isA11yMode)(testID, a11yLabel);
    if (!value) {
      return {};
    }
  }
  return isAndroid()
    ? { accessible: true, accessibilityLabel: value }
    : { testID: value };
};
