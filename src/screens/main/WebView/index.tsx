import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {NavigationParams} from '../../../navigation';
import WebView from 'react-native-webview';
import Loading from '../../../compoents/Loader';
type Props = StackScreenProps<NavigationParams, 'Webview'>;
const Webview: React.FC<Props> = ({route,navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const {checkouturl} = route.params;
  const webViewRef = useRef(null);

  const onNavigationStateChange = async(navState) => {
    console.log('this is navstat',navState);
    if(navState.url=='https://testdevelper.myshopify.com/checkouts/co/ab93981a7aa3238d38db6d3aac737f69/thank-you'){
      // navigation.navigate('Home')
    }
  
 }
  return (
    <View style={{flex: 1}}>
      {isLoading ? <Loading /> : null}
      <WebView
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
        onNavigationStateChange={onNavigationStateChange}
        // //    renderLoading={ActivityIndicatorElement}
        onLoad={() => setIsLoading(false)}
        style={{flex: 1}}
        source={{uri: checkouturl}}
      />
    </View>
  );
};

export default Webview;
