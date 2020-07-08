<h2 align="center">testing-a11y</h2>

<p align="center">
Some tools to make testing and accessibilty play a bit nicer with react/ react-native
</p>

### Example

You have a component that you'd like to test in the simulator using something like appium or detox.

```typescript
import * as React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";

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
import { StatusBar, StyleSheet, Text, View } from "react-native";

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
import { StatusBar, StyleSheet, Text, View } from "react-native";

export default () => (
  <>
    <Text>Label</Text>
    <Text testID="amount" accessible={true} accessibilityLabel="amount">
      £50.00
    </Text>
  </>
);
```

And now you realise that it's 2020 and ignoring a11y just isn't acceptable anymore.

You'll now need a flag for when to render a testID and when to render the real a11y label. Then if you want to test it, you'll either end up hard coding the value, or sharing a variable.

Enter `testing-a11y`!
