
import React, {Fragment, StrictMode} from 'react';
import {StatusBar, SafeAreaView, Alert} from 'react-native';
import {Provider} from 'react-redux';
import store from '../sopify/Redux/store';
import RootNavigation from '../navigation';
import Toast from 'react-native-toast-message';
import netInfo from '@react-native-community/netinfo'


const App:React.FC = () => {

  netInfo.addEventListener(state=>{
    if(!state.isConnected){
        Alert.alert('No Internet','Please Connect to the internet')
    }
  })
  return (
    <Fragment>
      <Provider store={store}>
        <StatusBar backgroundColor={'#e6f0f2'} />
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#e6f0f2',
          }}>
          <RootNavigation />
          <Toast position="bottom" bottomOffset={50} />
        </SafeAreaView>
      </Provider>
    </Fragment>
  );
};
export default App;
