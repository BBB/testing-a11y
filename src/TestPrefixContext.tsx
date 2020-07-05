import * as React from "react";

export const join = (...args: (string | undefined)[]) =>
  args.filter(Boolean).join(".");
export const joinPrefix = (...args: string[]) =>
  [getPrefix(), ...args].filter(Boolean).join(".");

const PrefixContext = React.createContext({ prefix: "" });
export const createTestPrefixContext = (): React.Context<string> => {
  const Provider = (props: React.PropsWithChildren<{ value: string }>) => {
    return (
      <PrefixContext.Provider
        value={{
          prefix: joinPrefix(props.value),
        }}
      >
        {props.children}
      </PrefixContext.Provider>
    );
  };
  return ({
    ...PrefixContext,
    Provider,
  } as unknown) as any;
};
export const TestPrefixContext = createTestPrefixContext();
export const TestIDPrefix = TestPrefixContext.Provider;

export const getPrefix = () => {
  const {
    prefix,
  } = (TestPrefixContext.Consumer as any)._context._currentValue2;
  return prefix;
};
