import {render} from '@testing-library/react-native';
import React from 'react';
import 'react-native';
import App, {textItemID, titleID} from './App';
import {a11yID, getAllTestIds, testID} from './lib/testID';

declare const global: {TEST_MODE: boolean};
global.TEST_MODE = true;

it('renders correctly', () => {
  const app = render(<App />);

  expect(app.getByTestId(a11yID(titleID))).toBeTruthy();
  expect(
    app.getByTestId(testID('Form.InnerForm.SubmitButton').testID!),
  ).toBeTruthy();
  expect(app.getByTestId(testID('SubmitButton').testID!)).toBeTruthy();
  expect(
    app.getByTestId(testID('DifferentForm.SubmitButton').testID!),
  ).toBeTruthy();
  expect(app.getByTestId(a11yID(textItemID(0)))).toBeTruthy();
  const testIDs = getAllTestIds('TextItem');
  expect(testIDs).toHaveLength(5);
  testIDs.forEach((testID) => {
    expect(app.getByTestId(testID)).toBeTruthy();
  });
});
