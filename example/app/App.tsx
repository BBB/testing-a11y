import React from 'react';
import {StatusBar, StyleSheet, View, Text} from 'react-native';
import {testID} from './lib/testID';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View>
        <Text {...testID('title')}>My App</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
