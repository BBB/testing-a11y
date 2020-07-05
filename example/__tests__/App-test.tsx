import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import App from '../app/App';
import {testID} from '../app/lib/testID';

it('renders correctly', () => {
  const app = renderer.create(<App />);
  expect(app.root.findByProps(testID('title'))).toBeDefined();
});
