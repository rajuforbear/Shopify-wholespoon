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
  const about = useSelector(state => state.data.about);
  console.log('this is about', about);
  return (
    <View style={{flex: 1, backgroundColor: '#e6f0f2'}}>
      <View
        style={{
          //borderWidth: 1,
          width: wp(54),
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: wp(2),
          marginLeft: wp(4),
        }}>
        <AntDesign
          onPress={() => navigation.replace('Home')}
          name="arrowleft"
          size={wp(7)}
          color="black"
        />
        <Text style={{fontSize: wp(5), fontWeight: '700', color: 'black'}}>
          About us
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          width: '95%',
          alignSelf: 'center',
          marginTop: wp(4),
        }}>
        <RenderHtml source={{html: about}} contentWidth={hp(100)} />
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
