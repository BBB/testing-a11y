import { A11y, a11yOf, TestIDs, PossiblyBuilt } from "./builder";

export const a11yID = <T extends (value: A11y<T>) => any>(
  propFormatter: T,
  map?: TestIDs
) => (value: string) => a11yBoth(propFormatter, map)(value, undefined);

export const a11yLabel = <T extends (value: A11y<T>) => any>(
  propFormatter: T,
  map?: TestIDs
) => (value: string) => a11yBoth(propFormatter, map)(undefined, value);

export const a11yBoth = <T extends (value: A11y<T>) => any>(
  propFormatter: T,
  map?: TestIDs
) => (testID: string | undefined, a11yLabel: string | undefined) =>
  a11yOf(propFormatter, map)(testID, a11yLabel)().asProps();
