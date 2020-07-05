import { a11yOrTest } from "./a11yOrTest";

export const testID = (isAndroid: () => boolean, isA11yMode: () => boolean) => (
  testID: string,
  allyLabel: string
) => {
  const value = a11yOrTest(isA11yMode)(testID, allyLabel);
  if (!value) {
    return {};
  }
  return isAndroid()
    ? { accessible: true, accessibilityLabel: value }
    : { testID: value };
};
