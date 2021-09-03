import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Reader from '../Pages/Reader/reader';
import Traductor from '../Pages/Traductor/traductor';
import Home from '../Pages/Home/home';
import Training from '../Pages/Training/training';

export default function Header(){
const Tab = createBottomTabNavigator();

    return (

      <Tab.Navigator 
          ScreenOptions = {{
            style: {
              backgroundColor: 'red',
              borderTopColor: 'green',
              activeTintColor: 'orange',
              inactiveTintColor: 'yellow',
              },

            tabStyle:{
                paddingBottom: 5,
                paddingTop: 5,
            }
        }}>

        <Tab.Screen  
         name="Home" 
         component={Home} 
         options={{
            headerTitleAlign: 'center',
            tabBarIcon: ({size,color}) =>(
            <FontAwesome5 name={'home'} size={40}  />
                )
        }} />

        <Tab.Screen name="Reader"
         component={Reader} 
         options={{
            headerTitleAlign: 'center',
            tabBarIcon: ({size,color}) =>(
            <FontAwesome5 name={'book-reader'} size={40}  />
            )
    }}/>

        <Tab.Screen 
         name="Traductor" 
         component={Traductor}
          options={{
                headerTitleAlign: 'center',
                tabBarIcon: ({size,color}) =>(
                <FontAwesome5 name={'language'} size={40}  />
                )
        }}/>

    <Tab.Screen 
         name="Training" 
         component={Training}
          options={{
                headerTitleAlign: 'center',
                tabBarIcon: ({size,color}) =>(
                <FontAwesome5 name={'graduation-cap'} size={40}  />
                )
        }}/>

    </Tab.Navigator> 

    );
}