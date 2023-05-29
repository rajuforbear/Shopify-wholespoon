import React, {useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
//import '@shopify/shopify-api/adapters/node';
import Client from 'shopify-buy';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MyStack from './src/navigation';
//import Shopify from './src/sopify/API/Shopify';
import {Provider} from 'react-redux';
import store from './src/sopify/Redux/store';
import Shopify from './src/sopify/API/Shopify';

const App = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightgrey', //#e6f0f2 //#87CEEB
      }}>
      <Provider store={store}>
        <StatusBar backgroundColor={'white'} />
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          <MyStack />
        </SafeAreaView>
      </Provider>
    </View>
  );
};
export default App;
