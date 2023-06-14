import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
//import MyTab from "../bottumtab";
import Home from '../../screens/main/Home';
import CostumDrawer from '../../compoents/CostumDrawer';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={pros => <CostumDrawer {...pros} />}
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="home" component={Home} />
    </Drawer.Navigator>
  );
};
export default MyDrawer;
