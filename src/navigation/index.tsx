import React from 'react';
import {StackNavigationProp, createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MyDrawer from './drawer';
import Splash from '../screens/Auth/Splash';
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp';
import Internet from '../screens/Auth/Internet';
import Otp from '../screens/Auth/OptPage';
import Search from '../screens/main/Search';
export type NavigationParams = {
  Splash: undefined;
  Home: undefined;
  Login: undefined;
  Register: {
    page:string
  };
  Internet: undefined;
  Otp: undefined;
  Search:{
    searchText:string
  };
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
        <Stack.Screen name="Internet" component={Internet} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name='Search' component={Search}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
