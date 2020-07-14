import { formatIx, testIDToUUID } from "./builder";

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
  return list.indices.map((ix) => formatIx(uuid, ix)) || [];
};
