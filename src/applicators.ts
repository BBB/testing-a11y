import { a11y } from "./a11y";
import { A11y, a11yOf, PossiblyBuilt, TestIDs } from "./builder";

export const a11yProps = <T extends (value: A11y) => any>(
  propFormatter: T,
  map?: TestIDs
) => (possiblyBuilt: PossiblyBuilt) => {
  const built =
    typeof possiblyBuilt === "function" ? possiblyBuilt() : possiblyBuilt;
  return a11y(propFormatter, map)(built);
};

export const a11yID = <T extends (value: A11y) => any>(
  propFormatter: T,
  map?: TestIDs
) => (value: string) => a11yBoth(propFormatter, map)(value, undefined);

export const a11yLabel = <T extends (value: A11y) => any>(
  propFormatter: T,
  map?: TestIDs
) => (value: string) => a11yBoth(propFormatter, map)(undefined, value);

export const a11yBoth = <T extends (value: A11y) => any>(
  propFormatter: T,
  map?: TestIDs
) => (testID: string | undefined, a11yLabel: string | undefined) =>
  a11y(propFormatter, map)(a11yOf(testID, a11yLabel)());
