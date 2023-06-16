import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MyStack from './Helper';
import Root from '../Root';
import {NavigationContainer} from '@react-navigation/native';
import MyDrawer from './drawer';
import Splash from '../screens/Auth/Splash';
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp';
import Innternet from '../screens/Auth/Innternet';

const RootNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={MyDrawer} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={SignUp} />
        <Stack.Screen name="Internet" component={Innternet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
