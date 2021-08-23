import React from 'react';
import {View} from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';

import styles from './headStyle';

import Traductor from '../body/traductor/index';


export default class Header extends React.Component{
    render() {
    return(
    <NativeRouter>
        <View style={styles.container}>
            <Switch>
                <Route exact path='../body/traductor/index' component={Traductor}/>
 {/*                <Route path='/' component={}/>
                <Route path='/' component={}/>
                <Route path='/' component={}/> */}
            </Switch>
        </View>
    </NativeRouter>
    );
  }
}