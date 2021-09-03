import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import Header from './src/Components/Header/header.js';

export default function App(){
  return(
    <NavigationContainer>
    <View style={styles.container}>
      <Header/>
    </View>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#555'
  }
});
