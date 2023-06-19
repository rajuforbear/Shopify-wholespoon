import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import HTMLView from 'react-native-htmlview';
import WebView from 'react-native-webview';
import RenderHtml from 'react-native-render-html';
import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const About = ({navigation}) => {
  const injectedJavaScript = `
  (function() {
    var style = document.createElement('style');
    style.innerHTML = \`
          
      p {
        background-color: #f0f0f0;
        font-family: Arial, sans-serif;
      }
    \`;
    document.head.appendChild(style);
  })();
`;
  const about = useSelector(state => state.data.about);
  console.log(about);
  console.log('this is about', about);
  return (
    <View style={{flex: 1, backgroundColor: '#e6f0f2'}}>
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: wp(5),
          paddingBottom: wp(20),
        }}>
        <RenderHtml source={{html: about}} style={{height: hp(100)}} />
      </ScrollView>
    </View>
  );
};

export default About;
const style = StyleSheet.create({
  br: {
    fontWeight: '100',
    color: '#FF3366',
  },
});
