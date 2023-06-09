import React, {Fragment} from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/sopify/Redux/store';
import RootNavigation from './src/navigation/index';
import Toast from 'react-native-toast-message';

const App:React.FC = () => {
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
