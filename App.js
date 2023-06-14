import React, {useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import MyStack from './src/navigation';

import {Provider} from 'react-redux';
import store from './src/sopify/Redux/store';

const App = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightgrey', //#e6f0f2 //#87CEEB
      }}>
      <Provider store={store}>
        <StatusBar backgroundColor={'#e6f0f2'} />
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#e6f0f2',
          }}>
          <MyStack />
        </SafeAreaView>
      </Provider>
    </View>
  );
};
export default App;
