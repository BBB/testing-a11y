export const a11yOrTest = (isA11yMode: () => boolean) => <TestValue, AllyValue>(
  testValue: TestValue,
  allyValue: AllyValue
) => (isA11yMode() ? allyValue : testValue);
