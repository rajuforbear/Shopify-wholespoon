import React, {useEffect,Fragment} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import MyStack from './src/navigation/Helper/index.js';

import {Provider} from 'react-redux';
import store from './src/sopify/Redux/store';
import Root from './src/Root';
import RootNavigation from './src/navigation/index.js';


const App = () => {
  return (
    <Fragment>
    
      <Provider store={store}>
        <StatusBar backgroundColor={'#e6f0f2'} />
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#e6f0f2',
          }}>
        <RootNavigation/>
        </SafeAreaView>
      </Provider>
      </Fragment>
  );
};
export default App;
