import { makeTestID } from "./testID";

const notIsAndroid = makeTestID(() => false);
const isAndroid = makeTestID(() => true);

test("it should return testID when not android", () => {
  expect(notIsAndroid("title")).toEqual({
    testID: "title",
  });
});

test("it should return accessibilityLabel when android", () => {
  expect(isAndroid("title")).toEqual({
    accessibilityLabel: "title",
    accessible: true,
  });
});
