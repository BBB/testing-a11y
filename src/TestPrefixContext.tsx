import * as React from "react";

export const join = (...args: string[]) => args.filter(Boolean).join(".");

const PrefixContext = React.createContext({ prefix: "" });
export const createTestPrefixContext = (): React.Context<string> => {
  const Provider = (props: React.PropsWithChildren<{ value: string }>) => {
    const { prefix } = (PrefixContext.Consumer as any)._context._currentValue2;
    return (
      <PrefixContext.Provider
        value={{
          prefix: join(prefix, props.value),
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
