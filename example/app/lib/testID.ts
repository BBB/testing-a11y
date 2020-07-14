import {Platform} from 'react-native';
import {
  a11yBoth as _a11yBoth,
  a11yOf as _a11yOf,
  a11yID as _a11yID,
  a11yLabel as _a11yLabel,
  getAllTestIdsForTestId,
  formatReactNative,
} from 'testing-a11y';

declare const global: {TEST_MODE: boolean};

export const getAllTestIds = getAllTestIdsForTestId();

const isAndroid = () => Platform.OS === 'android';
const isTestMode = () => !global.TEST_MODE;

const formatter = formatReactNative(isTestMode, isAndroid);
export const a11yBoth = _a11yBoth(formatter);

export const a11yOf = _a11yOf(formatter);

export const a11yID = _a11yID(formatter);

export const a11yLabel = _a11yLabel(formatter);
