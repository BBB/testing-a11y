import * as React from 'react';
import {Button, ButtonProps} from 'react-native';
import {testID} from '../lib/testID';

export const SubmitButton: React.SFC<Pick<ButtonProps, 'onPress'>> = (
  props,
) => {
  return (
    <Button
      title={'Submit'}
      onPress={props.onPress}
      {...testID('SubmitButton')}
    />
  );
};
