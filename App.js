import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Header from './src/Components/Header/header.js';

export default function App(){
  return(
    <View style={styles.container}>
      <Header/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#aaa'
  }
});
