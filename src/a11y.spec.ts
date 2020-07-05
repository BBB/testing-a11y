import { a11yBoth, formatDefault } from "./a11y";

const testValue = "title";
const a11yValue = "a11y title";

const map = new Map([
  [testValue, [testValue]],
  [a11yValue, [a11yValue]],
]);

type Params = [string | undefined, string | undefined];
type Case = {
  isA11y: boolean;
  expected:
    | {
        accessibilityLabel: string;
        accessible: boolean;
      }
    | {
        testID: string;
      }
    | {};
  params: Params;
};

test.each(
  [
    {
      isA11y: false,
    },
    {
      isA11y: true,
    },
  ].reduce<Case[]>((agg, item) => {
    agg.push({
      ...item,
      params: [testValue, a11yValue],
      expected: item.isA11y
        ? {
            testID: a11yValue,
          }
        : {
            testID: testValue,
          },
    });
    agg.push({
      ...item,
      params: [testValue, undefined],
      expected: item.isA11y
        ? {}
        : {
            testID: testValue,
          },
    });
    agg.push({
      ...item,
      params: [undefined, a11yValue],
      expected: {
        testID: a11yValue,
      },
    });

    return agg;
  }, [])
)("it should apply the correct props %p", (args) => {
  expect(
    a11yBoth(formatDefault(), () => args.isA11y, map)(...args.params)
  ).toEqual(args.expected);
});
