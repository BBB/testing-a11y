import React from 'react';
import {StatusBar, StyleSheet, View, Text} from 'react-native';
import {testIDAndA11y, testID, a11yLabel} from './lib/testID';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View>
        <Text {...testIDAndA11y('title', 'App title')}>My App</Text>
        <Text {...testID('test only id')}>My App</Text>
        <Text {...a11yLabel('A11y only label')}>My App</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
