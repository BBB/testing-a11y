import {render} from '@testing-library/react-native';
import React from 'react';
import {PossiblyBuilt} from 'testing-a11y/builder';
import App, {textItemID, titleID} from './App';
import {submitButtonID} from './components/SubmitButton';
import {getAllTestIds} from './lib/testID';

declare const global: {TEST_MODE: boolean};
global.TEST_MODE = true;

it('renders correctly', () => {
  const app = render(<App />);

  expect(app.getByTestId(titleID.asTestID())).toBeTruthy();
  expect(
    app.getByTestId(submitButtonID('Form.InnerForm').asTestID()),
  ).toBeTruthy();
  expect(app.getByTestId(submitButtonID.asTestID())).toBeTruthy();
  expect(
    app.getByTestId(submitButtonID('DifferentForm').asTestID()),
  ).toBeTruthy();
  expect(app.getByTestId(textItemID(0).asTestID())).toBeTruthy();
  const testIDs = getAllTestIds('TextItem');
  expect(testIDs).toHaveLength(5);
  testIDs.forEach((testID) => {
    expect(app.getByTestId(testID)).toBeTruthy();
  });
});
