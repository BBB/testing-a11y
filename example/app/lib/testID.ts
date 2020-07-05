import {Platform} from 'react-native';
import {
  a11yBoth as _a11yBoth,
  a11yBuilder,
  a11yID as _a11yID,
  a11yLabel as _a11yLabel,
  a11yProps as _a11yProps,
  getAllTestIdsForTestId,
} from 'testing-a11y';

declare const global: {TEST_MODE: boolean};

export const getAllTestIds = getAllTestIdsForTestId();

export const testIDAndA11y = _a11yBoth(
  () => Platform.OS === 'android',
  () => !global.TEST_MODE,
);

export {a11yBuilder};

export const a11yProps = _a11yProps(
  () => Platform.OS === 'android',
  () => !global.TEST_MODE,
);

export const a11yID = _a11yID(
  () => Platform.OS === 'android',
  () => !global.TEST_MODE,
);

export const a11yLabel = _a11yLabel(
  () => Platform.OS === 'android',
  () => !global.TEST_MODE,
);
