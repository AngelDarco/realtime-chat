import React from 'react';
import { View, Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Reader from '../Pages/Reader/reader';
import Traductor from '../Pages/Traductor/traductor';


export default function Header(){
const Tab = createBottomTabNavigator();
 
    return (

      <Tab.Navigator>
      <Tab.Screen name="Reader" component={Reader} />
      <Tab.Screen name="Traductor" component={Traductor} />
    </Tab.Navigator> 

    );
}