export const makeA11yOrTest = (a11yMode: () => boolean) => <
  AllyValue,
  TestValue
>(
  allyValue: AllyValue,
  testValue: TestValue
) => (a11yMode() ? allyValue : testValue);
