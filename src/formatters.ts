import { Built } from "./builder";

const isUndefined = (arg: any): arg is undefined => {
  return typeof arg === "undefined";
};

export const formatReactNative = (
  isA11y: () => boolean,
  isAndroid: () => boolean
) => (built: Built) => {
  if (isA11y()) {
    return formatA11y()(built.a11yLabel);
  }
  if (isAndroid()) {
    return formatTestIDAndroid()(built.testID);
  }
  return formatTestIDDefault()(built.testID);
};

export const formatA11y = () => (value: string | undefined) =>
  isUndefined(value)
    ? {}
    : {
        accessible: true,
        accessibilityLabel: value,
      };
export const formatTestIDAndroid = () => formatA11y();
export const formatTestIDDefault = () => (value: string | undefined) =>
  isUndefined(value) ? {} : { testID: value };
