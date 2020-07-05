export const makeTestID = (isAndroid: () => boolean) => (id: string) => {
  return isAndroid()
    ? { accessible: true, accessibilityLabel: id }
    : { testID: id };
};
