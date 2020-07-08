<h2 align="center">testing-a11y</h2>

<p align="center">
Some tools to make testing and accessibilty play a bit nicer with react/ react-native
</p>

### Example

You have a component that you'd like to write integration tests for in the simulator using something like appium or detox.

```typescript
import * as React from "react";
import { Text } from "react-native";

export default () => (
  <>
    <Text>Label</Text>
    <Text>£50.00</Text>
  </>
);
```

So you add a testID

```typescript
import * as React from "react";
import { Text } from "react-native";

export default () => (
  <>
    <Text>Label</Text>
    <Text testID="amount">£50.00</Text>
  </>
);
```

But then you realise that you need to pass separate props for android

```typescript
import * as React from "react";
import { Text } from "react-native";

export default () => (
  <>
    <Text>Label</Text>
    <Text testID="amount" accessible={true} accessibilityLabel="amount">
      £50.00
    </Text>
  </>
);
```

Now you need to share a reference to the testID with your integration tests

```typescript
import * as React from "react";
import { Text } from "react-native";

export const testID = "amount";

export default () => (
  <>
    <Text>Label</Text>
    <Text testID={testID} accessible={true} accessibilityLabel={testID}>
      £50.00
    </Text>
  </>
);
```

Uh-oh! it's 2020 and ignoring accessibilty issues just isn't ok. You'll now need a flag for when to render a testID and when to render the real a11y label.

```typescript
import * as React from "react";
import { Text } from "react-native";

export const testID = "amount";
const isTesting = () => global.TEST_MODE === true;

export default () => (
  <>
    <Text>Label</Text>
    <Text
      testID={testID}
      accessible={true}
      accessibilityLabel={isTesting() ? testID : "The price of the item"}
    >
      £50.00
    </Text>
  </>
);
```

That's a load of juggling for every component

Enter `testing-a11y`!

```typescript
import * as React from "react";
import { Text } from "react-native";
import { a11yLabel, a11yOf, a11yProps } from "./lib/testID";

export const amountID = a11yOf("amount", "The price of the item");

export default () => (
  <>
    <Text>Label</Text>
    <Text {...a11yProps(amountID)}>£50.00</Text>
  </>
);
```

Much simpler! The library takes care of the platform/ a11y switching for you, and allows you to store one reference for testID and a11yLabels in a single place.

Want a unique id for an item in a list? `testing-a11y` can do that too, simply call `amountID(ix)` instead of passing it:

```typescript
import * as React from "react";
import { Text } from "react-native";
import { a11yLabel, a11yOf, a11yProps } from "./lib/testID";

export const amountID = a11yOf("amount", "The price of the item");

export default (props) => (
  <>
    {props.items.map((item, ix) => {
      return (
        <Text>{item.name}</Text>
        <Text {...a11yProps(amountID(ix))}>{item.amount}</Text>
      )
    })}
  </>
);
```

Imagine you have a common component used all over your app. Each time you use it, because you want it to be easily selectable, you end up passing a differentiating string through to the component to add to the test.

`testing-a11y` simplifies this by allowing you to wrap components. Everything inside the wrapper will have the prefix added to it's testID!

```typescript
import * as React from "react";
import { Text, Button } from "react-native";
import { a11yLabel, a11yOf, a11yProps } from "./lib/testID";

export const submitButtonID = a11yOf("SubmitButton");

export const SubmitButton: React.SFC<{}> = (props) => {
  return (
    <Button
      title={"Submit"}
      onPress={() => void 0}
      {...a11yProps(submitButtonID())}
    />
  );
};

export default (props) => (
  <>
    <TestIDPrefix value="Form">
      <TestIDPrefix value="InnerForm">
        <SubmitButton />
      </TestIDPrefix>
    </TestIDPrefix>
    <TestIDPrefix value="DifferentForm">
      <SubmitButton />
    </TestIDPrefix>
  </>
);
```

You can now select the two different buttons with:

```typescript
const firstButton = submitButtonID("Form.InnerForm");
const otherButton = submitButtonID("DifferentForm");
```

Much cleaner!
