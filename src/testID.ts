export const makeTestID = (isAndroid: () => boolean) => (testID: string) => {
  return isAndroid()
    ? { accessible: true, accessibilityLabel: testID }
    : { testID: testID };
};
