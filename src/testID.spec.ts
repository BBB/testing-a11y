import { testID } from "./testID";

const testValue = "title";
const a11yValue = "a11y title";

const map = new Map([
  [testValue, testValue],
  [a11yValue, a11yValue],
]);

type Params = [string | undefined, string | undefined];
type Case = {
  isAndroid: boolean;
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
      isAndroid: true,
      isA11y: false,
    },
    {
      isAndroid: false,
      isA11y: false,
    },
    {
      isAndroid: true,
      isA11y: true,
    },
    {
      isAndroid: false,
      isA11y: true,
    },
  ].reduce<Case[]>((agg, item) => {
    agg.push({
      ...item,
      params: [testValue, a11yValue],
      expected: item.isA11y
        ? item.isAndroid
          ? {
              accessibilityLabel: a11yValue,
              accessible: true,
            }
          : {
              testID: a11yValue,
            }
        : item.isAndroid
        ? {
            accessibilityLabel: testValue,
            accessible: true,
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
        : item.isAndroid
        ? {
            accessibilityLabel: testValue,
            accessible: true,
          }
        : {
            testID: testValue,
          },
    });
    agg.push({
      ...item,
      params: [undefined, a11yValue],
      expected: item.isAndroid
        ? {
            accessibilityLabel: a11yValue,
            accessible: true,
          }
        : {
            testID: a11yValue,
          },
    });

    return agg;
  }, [])
)("it should apply the correct props %p", (args) => {
  expect(
    testID(
      () => args.isAndroid,
      () => args.isA11y,
      map
    )(...args.params)
  ).toEqual(args.expected);
});
