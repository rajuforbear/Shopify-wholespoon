import {View, Text} from 'react-native';
import React from 'react';
import MyStack from '../navigation/Helper';
import BottumTab from '../compoents/BottumTab';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from '../navigation';
import Header from '../compoents/Header';

const Root = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Header />
      <MyStack />
      <BottumTab navigation={navigation} />
    </View>
  );
};

export default Root;
