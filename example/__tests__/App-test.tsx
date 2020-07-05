import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import App from '../app/App';
import {testID, testIDAndA11y, a11yLabel} from '../app/lib/testID';

it('renders correctly', () => {
  const app = renderer.create(<App />);
  expect(
    app.root.findByProps(testIDAndA11y('title', 'App title')),
  ).toBeDefined();
  expect(app.root.findByProps(testID('title1'))).toBeDefined();
  expect(app.root.findByProps(a11yLabel('A11y only label'))).toBeDefined();
});
