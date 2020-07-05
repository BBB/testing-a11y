import {makeTestID} from 'testing-a11y';
import {Platform} from 'react-native';

declare const global: {TEST_MODE: boolean};

export const testIDAndA11y = makeTestID(
  () => Platform.OS === 'android',
  () => !global.TEST_MODE,
);

export const testID = (value: string, ix?: number) =>
  testIDAndA11y(value, undefined, ix);
export const a11yLabel = (value: string) => testIDAndA11y(undefined, value);
