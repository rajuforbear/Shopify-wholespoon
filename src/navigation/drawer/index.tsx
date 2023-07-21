import React from 'react';
import {DrawerNavigationProp, createDrawerNavigator} from '@react-navigation/drawer';
//import MyTab from "../bottumtab";
import Home from '../../screens/main/Home';
import CostumDrawer from '../../compoents/CostumDrawer';
import HelperRoot from '../Helper';
import { DrawerRouterOptions, RouteProp, useNavigation, useRoute } from '@react-navigation/native';

export type DrawerNavigationPramas = {
  Home: undefined;
  home: undefined;
};
const Drawer = createDrawerNavigator<DrawerNavigationPramas>();
const MyDrawer:React.FC = () => {
  const navigation=useNavigation<DrawerNavigationProp<DrawerNavigationPramas>>()
 const route=useRoute<any>()
  return (
    <Drawer.Navigator
      drawerContent={pros => <CostumDrawer  navigation={navigation} route={route} />}
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="home" component={HelperRoot} />
    </Drawer.Navigator>
  );
};
export default MyDrawer;
