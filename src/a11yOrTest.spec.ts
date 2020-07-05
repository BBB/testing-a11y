import { a11yOrTest } from "./a11yOrTest";

const enabled = a11yOrTest(() => true);
const disabled = a11yOrTest(() => false);

test("it should return a11y value when enabled", () => {
  expect(enabled("test", "a11y")).toBe("a11y");
});

test("it should return test value when disabled", () => {
  expect(disabled("test", "a11y")).toBe("test");
});
