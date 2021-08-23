import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/header/head.js';


export default function App() {
  return (
    <View style={styles.container}>
      <Header></Header>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'grey'
  },
});
