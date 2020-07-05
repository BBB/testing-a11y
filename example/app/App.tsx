import * as React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {TestIDPrefix} from 'testing-a11y';
import {SubmitButton} from './components/SubmitButton';
import {a11yLabel, testID, testIDAndA11y} from './lib/testID';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      {Array.from(new Array(5)).map((_, ix) => {
        return (
          <Text key={ix} {...testID('TextItem', ix)}>
            Text {ix + 1}
          </Text>
        );
      })}
      <View>
        <Text {...testIDAndA11y('title', 'App title')}>My App</Text>
        <Text {...testID('test only id')}>My App</Text>
        <Text {...a11yLabel('A11y only label')}>My App</Text>
        <SubmitButton onPress={() => void 0} />
        <TestIDPrefix value="Form">
          <TestIDPrefix value="InnerForm">
            <SubmitButton onPress={() => void 0} />
          </TestIDPrefix>
        </TestIDPrefix>
        <TestIDPrefix value="DifferentForm">
          <SubmitButton onPress={() => void 0} />
        </TestIDPrefix>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
