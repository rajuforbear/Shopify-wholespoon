import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../../screens/main/Home';
import Login from '../../screens/Auth/Login';
import SignUp from '../../screens/Auth/SignUp';
//import Tab from "./bottumtab";
import MyDrawer from '../drawer';
//import MyTab from "./bottumtab";
import Cart from '../../screens/main/Cart';
import Profile from '../../screens/main/Profile';
import Details from '../../screens/main/Details';
import Categories from '../../screens/main/Categories';
import Favorit from '../../screens/main/Favorites';
import ProductList from '../../screens/main/ProductList';
import OrderList from '../../screens/main/OrderList';
import Checkout from '../../screens/main/Checkout';
import Payment from '../../screens/main/Payment';
import OrderDetails from '../../screens/main/OrderDetails';
import AddressBook from '../../screens/main/AdressBook';
import Splash from '../../screens/Auth/Splash';
import About from '../../screens/main/About';
import Root from '../../Root';
import Address from '../../screens/main/Checkout/Address';
// npm i  @shopify/shopify-api
// npm i react-native-shopify
//npm i react-native-shopify@0.0.1-alpha.0

const Stack = createStackNavigator();
const MyStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Favorite" component={Favorit} />
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="OrderList" component={OrderList} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="AddressBook" component={AddressBook} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Address" component={Address} />
    </Stack.Navigator>
  );
};
export default MyStack;
