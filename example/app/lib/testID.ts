import {makeTestID, getAllTestIdsForTestId} from 'testing-a11y';
import {Platform} from 'react-native';

declare const global: {TEST_MODE: boolean};

export const getAllTestIds = getAllTestIdsForTestId();

export const testIDAndA11y = makeTestID(
  () => Platform.OS === 'android',
  () => !global.TEST_MODE,
);

export const a11yBuilder = (
  testID: string | undefined,
  a11yLabel?: string | undefined,
) => (ix?: number) => ({
  testID,
  a11yLabel,
  ix,
});

export const a11yProps = (
  built:
    | ReturnType<typeof a11yBuilder>
    | ReturnType<ReturnType<typeof a11yBuilder>>,
) => {
  const finished = typeof built === 'function' ? built() : built;
  return testIDAndA11y(finished.testID, finished.a11yLabel, finished.ix);
};

export const a11yID = (...args: Parameters<typeof a11yProps>) =>
  a11yProps(...args).testID!;

export const testID = (value: string, ix?: number) =>
  testIDAndA11y(value, undefined, ix);
export const a11yLabel = (value: string) => testIDAndA11y(undefined, value);
