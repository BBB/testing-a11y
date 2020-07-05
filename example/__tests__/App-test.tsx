/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../app/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const app = renderer.create(<App />);
  expect(app.root.findByProps({testID: 'title'})).toBeDefined();
});
