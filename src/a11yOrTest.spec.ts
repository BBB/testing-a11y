import { makeA11yOrTest } from "./a11yOrTest";

const enabled = makeA11yOrTest(() => true);
const disabled = makeA11yOrTest(() => false);

test("it should return a11y value when enabled", () => {
  expect(enabled("a11y", "test")).toBe("a11y");
});

test("it should return test value when disabled", () => {
  expect(disabled("a11y", "test")).toBe("test");
});
