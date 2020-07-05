import * as React from 'react';
import {Button, ButtonProps} from 'react-native';
import {a11yBuilder, a11yProps} from '../lib/testID';

export const submitButtonID = a11yBuilder('SubmitButton');

export const SubmitButton: React.SFC<{}> = (props) => {
  return (
    <Button
      title={'Submit'}
      onPress={() => void 0}
      {...a11yProps(submitButtonID())}
    />
  );
};
