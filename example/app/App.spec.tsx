import {render} from '@testing-library/react-native';
import React from 'react';
import 'react-native';
import {a11yProps} from 'testing-a11y';
import App, {textItemID, titleID} from './App';
import {submitButtonID} from './components/SubmitButton';
import {getAllTestIds} from './lib/testID';

declare const global: {TEST_MODE: boolean};
global.TEST_MODE = true;

const isUndefined = (arg: any): arg is undefined => {
  return typeof arg === 'undefined';
};

const testID = a11yProps((value) => {
  if (isUndefined(value)) {
    throw new Error('no testID');
  }
  return value.testID!;
});

it('renders correctly', () => {
  const app = render(<App />);

  expect(app.getByTestId(testID(titleID))).toBeTruthy();
  expect(
    app.getByTestId(testID(submitButtonID('Form.InnerForm'))),
  ).toBeTruthy();
  expect(app.getByTestId(testID(submitButtonID()))).toBeTruthy();
  expect(app.getByTestId(testID(submitButtonID('DifferentForm')))).toBeTruthy();
  expect(app.getByTestId(testID(textItemID(0)))).toBeTruthy();
  const testIDs = getAllTestIds('TextItem');
  expect(testIDs).toHaveLength(5);
  testIDs.forEach((testID) => {
    expect(app.getByTestId(testID)).toBeTruthy();
  });
});
