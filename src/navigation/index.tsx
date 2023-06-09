import React from 'react';
import {StackNavigationProp, createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MyDrawer from './drawer';
import Splash from '../screens/Auth/Splash';
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp';
import Innternet from '../screens/Auth/Innternet';
import Opt from '../screens/Auth/OptPage';
import type { CompositeNavigationProp } from '@react-navigation/native';
import { HelperNavigationParams } from './Helper';
export type NavigationParams = {
  Splash: undefined;
  Home: undefined;
  Login: undefined;
  Register: {
    page:string
  };
  Internet: undefined;
  Otp: undefined;
};

const RootNavigation: React.FC = () => {
  const Stack = createStackNavigator<NavigationParams>();

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
        <Stack.Screen name="Otp" component={Opt} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
