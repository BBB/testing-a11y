import { PossiblyBuilt, Built, testIDToUUID, a11yBuilder } from "./builder";
import { a11y } from "./a11y";

export const a11yProps = <T extends (value: Built) => any>(
  propFormatter: T,
  map?: typeof testIDToUUID
) => (possiblyBuilt: PossiblyBuilt) => {
  const built =
    typeof possiblyBuilt === "function" ? possiblyBuilt() : possiblyBuilt;
  return a11y(propFormatter, map)(built);
};

export const a11yID = <T extends (value: Built) => any>(
  propFormatter: T,
  map?: typeof testIDToUUID
) => (value: string) => a11yBoth(propFormatter, map)(value, undefined);

export const a11yLabel = <T extends (value: Built) => any>(
  propFormatter: T,
  map?: typeof testIDToUUID
) => (value: string) => a11yBoth(propFormatter, map)(undefined, value);

export const a11yBoth = <T extends (value: Built) => any>(
  propFormatter: T,
  map?: typeof testIDToUUID
) => (testID: string | undefined, a11yLabel: string | undefined) =>
  a11y(propFormatter, map)(a11yBuilder(testID, a11yLabel)());
