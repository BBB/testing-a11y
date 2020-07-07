import { testIDToUUID, A11y, TestIDs } from "./builder";

export const getAllTestIdsForTestId = (map = testIDToUUID) => (
  testID: string
) => {
  const list = map.get(testID);
  if (!list) {
    throw new Error(`Nothing found for id: ${testID} in map: ${map}`);
  }
  const uuid = list.uuid;
  if (list.indices.length === 1 && list.indices[0] === -1) {
    return [uuid];
  }
  return list.indices.map((ix) => `${uuid}-${ix}`) || [];
};

export const a11y = <T extends (value: A11y) => any, R = ReturnType<T>>(
  propFormatter: T,
  map?: TestIDs
) => (built: A11y): R => {
  return propFormatter(built.finalise(map));
};
