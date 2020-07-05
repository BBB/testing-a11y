import { testID } from "./testID";

const notIsAndroid = testID(
  () => false,
  () => false
);
const isAndroid = testID(
  () => true,
  () => false
);

test("it should return testID when not android", () => {
  expect(notIsAndroid("title", "a11y title")).toEqual({
    testID: "title",
  });
});

test("it should return accessibilityLabel when android", () => {
  expect(isAndroid("title", "a11y title")).toEqual({
    accessibilityLabel: "title",
    accessible: true,
  });
});
