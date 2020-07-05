import * as React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {TestIDPrefix} from 'testing-a11y';
import {SubmitButton} from './components/SubmitButton';
import {a11yLabel, a11yBuilder, a11yProps} from './lib/testID';

export const titleID = a11yBuilder('title', 'App title');
export const title2ID = a11yBuilder('test only id');
export const textItemID = a11yBuilder('TextItem');

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      {Array.from(new Array(5)).map((_, ix) => {
        return (
          <Text key={ix} {...a11yProps(textItemID(ix))}>
            Text {ix + 1}
          </Text>
        );
      })}
      <View>
        <Text {...a11yProps(titleID)}>My App</Text>
        <Text {...a11yProps(title2ID)}>Subheading</Text>
        <Text {...a11yLabel('A11y only label')}>Description</Text>
        <SubmitButton />
        <TestIDPrefix value="Form">
          <TestIDPrefix value="InnerForm">
            <SubmitButton />
          </TestIDPrefix>
        </TestIDPrefix>
        <TestIDPrefix value="DifferentForm">
          <SubmitButton />
        </TestIDPrefix>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
