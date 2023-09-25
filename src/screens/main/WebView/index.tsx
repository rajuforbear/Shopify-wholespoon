import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {NavigationParams} from '../../../navigation';
import WebView from 'react-native-webview';
import Loading from '../../../compoents/Loader';
type Props = StackScreenProps<NavigationParams, 'Webview'>;
const Webview: React.FC<Props> = ({route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const {checkouturl} = route.params;
  const webViewRef = useRef(null);
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
        // //    onNavigationStateChange={onNavigationStateChange}
        // //    renderLoading={ActivityIndicatorElement}
        onLoad={() => setIsLoading(false)}
        style={{flex: 1}}
        source={{uri: checkouturl}}
      />
    </View>
  );
};

export default Webview;
