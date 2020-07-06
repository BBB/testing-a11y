import { a11yBoth, formatReactNative } from "./a11y";

const testValue = "title";
const a11yValue = "a11y title";

const map = new Map([
  [testValue, { uuid: testValue, indices: [-1] }],
  [a11yValue, { uuid: a11yValue, indices: [-1] }],
]);

type Params = [string | undefined, string | undefined];
type Case = {
  isA11y: boolean;
  isAndroid: boolean;
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
      isAndroid: true,
    },
    {
      isA11y: true,
      isAndroid: true,
    },

    {
      isA11y: false,
      isAndroid: false,
    },
    {
      isA11y: true,
      isAndroid: false,
    },
  ].reduce<Case[]>((agg, item) => {
    agg.push({
      ...item,
      params: [testValue, a11yValue],
      expected: item.isA11y
        ? {
            accessibilityLabel: a11yValue,
            accessible: true,
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
      expected: item.isA11y
        ? {
            accessibilityLabel: a11yValue,
            accessible: true,
          }
        : {},
    });

    return agg;
  }, [])
)("it should apply the correct props %p", (args) => {
  expect(
    a11yBoth(
      formatReactNative(
        () => args.isA11y,
        () => args.isAndroid
      ),
      map
    )(...args.params)
  ).toEqual(args.expected);
});
