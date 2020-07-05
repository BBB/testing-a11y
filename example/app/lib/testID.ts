import {makeTestID} from 'testing-a11y';
import {Platform} from 'react-native';

declare const global: {TEST_MODE: boolean};

export const testID = makeTestID(
  () => Platform.OS === 'android',
  () => !global.TEST_MODE,
);
