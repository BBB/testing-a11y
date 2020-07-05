import {render} from '@testing-library/react-native';
import React from 'react';
import 'react-native';
import App from './App';
import {testID, testIDAndA11y, getAllTestIds} from './lib/testID';

declare const global: {TEST_MODE: boolean};
global.TEST_MODE = true;

it('renders correctly', () => {
  const app = render(<App />);

  expect(
    app.getByTestId(testIDAndA11y('title', 'App title').testID!),
  ).toBeTruthy();
  expect(
    app.getByTestId(testID('Form.InnerForm.SubmitButton').testID!),
  ).toBeTruthy();
  expect(app.getByTestId(testID('SubmitButton').testID!)).toBeTruthy();
  expect(
    app.getByTestId(testID('DifferentForm.SubmitButton').testID!),
  ).toBeTruthy();
  expect(app.getByTestId(testID('TextItem', 0).testID!)).toBeTruthy();
  const testIDs = getAllTestIds('TextItem');
  expect(testIDs).toHaveLength(5);
  testIDs.forEach((testID) => {
    expect(app.getByTestId(testID)).toBeTruthy();
  });
});
