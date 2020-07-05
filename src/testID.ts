import { makeA11yOrTest } from "./a11yOrTest";

export const makeTestID = (
  isAndroid: () => boolean,
  isA11yMode: () => boolean
) => (testID: string, allyLabel: string) => {
  const a11yOrTest = makeA11yOrTest(isA11yMode);
  const value = a11yOrTest(allyLabel, testID);
  if (!value) {
    return {};
  }
  return isAndroid()
    ? { accessible: true, accessibilityLabel: a11yOrTest(allyLabel, testID) }
    : { testID: a11yOrTest(allyLabel, testID) };
};
