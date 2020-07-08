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

Now you need to share a reference to the testID with you integration tests

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

And now you realise that it's 2020 and ignoring a11y just isn't acceptable anymore. You'll now need a flag for when to render a testID and when to render the real a11y label.

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
import { a11yLabel, a11yBuilder, a11yProps } from "./lib/testID";

export const amountID = a11yBuilder("amount", "The price of the item");

export default () => (
  <>
    <Text>Label</Text>
    <Text {...a11yProps(amountID)}>£50.00</Text>
  </>
);
```

Much simpler! The library takes care of the platform/ a11y switching for you, and allows you to store one reference for testID and a11yLabels in a single place.
