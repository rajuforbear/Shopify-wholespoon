import React, {useRef, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {NavigationParams} from '../../../navigation';
import WebView from 'react-native-webview';
import Loading from '../../../compoents/Loader';
import {mainuirl} from '../../../sopify/Constants';
import {query} from '../Home/query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
type Props = StackScreenProps<NavigationParams, 'Webview'>;
type Navraf = {
  target: number;
  url: string;
  title: string;
  canGoBack: boolean;
  loading: boolean;
  canGoForward: boolean;
  navigationType: string;
};
const Webview: React.FC<Props> = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const {checkouturl, page} = route.params;
  const webViewRef = useRef(null);
  const onNavigationStateChange = async (navRaf: Navraf) => {
    console.log(navRaf);
    if (
      navRaf.title === 'Thank you for your purchase! - MyStore123432 - Checkout'
    ) {
      navigation.reset({index: 0, routes: [{name: 'Home'}]});
      if (page === 'cart') {
        await AsyncStorage.setItem('cartId', '');
      }
      const userToke = await AsyncStorage.getItem('Token');
      let data = JSON.stringify({
        query: `query{
          customer(customerAccessToken:${JSON.stringify(userToke)}){
          ${query}
      }`,
        variables: {},
      });
      dispatch({
        type: 'sopify/userDatareq',
        data: data,
        page: 'home',
        navigation,
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      {isLoading ? <Loading /> : null}
      <WebView
        onLoad={() => setIsLoading(false)}
        style={{flex: 1}}
        source={{uri: checkouturl}}
        onNavigationStateChange={onNavigationStateChange}
      />
    </View>
  );
};

export default Webview;
// automaticallyAdjustContentInsets={false}
// ref={webViewRef}
// source={{
//   html: checkouturl,
// }}
// //injectedJavaScript={INJECTEDJAVASCRIPT}
// //injectedJavaScriptBeforeContentLoaded={pucJavaScript}
// scrollEnabled
// scalesPageToFit={false}
// originWhitelist={['*']}
// // onMessage={_onMessage}
// //javaScriptEnabled={true}
// cacheEnabled={true}
// allowFileAccessFromFileURLs={true}
// setSupportMultipleWindows={true}
// domStorageEnabled={true}
// allowUniversalAccessFromFileURLs={true}
// //    onShouldStartLoadWithRequest={(request)=>{
// //      const {url} = request;
// //      if (url === params.redirect_url || url === params.cancel_url) {
// //        webViewRef.current.injectJavaScript(pucJavaScript);
// //      }
// //      return true;
// //    }}
// //    startInLoadingState={true}
// //    onNavigationStateChange={onNavigationStateChange}
// //    renderLoading={ActivityIndicatorElement}
