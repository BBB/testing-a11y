import { testIDToUUID, Built } from "./builder";

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

export const a11y = <T extends (value: Built) => any, R = ReturnType<T>>(
  propFormatter: T,
  map?: typeof testIDToUUID
) => (built: Built): R => {
  return propFormatter(built.finalise(map));
};
