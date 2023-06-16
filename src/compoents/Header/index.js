import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  StatusBar,
  Platform,
  TextInput,
} from 'react-native';
import styles from './styles';
import Entypo from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5 from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation, StackActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState();
  useEffect(() => {
    getToken();
  }, []);
  const getToken = async () => {
    let toke = await AsyncStorage.getItem('Token');
    setToken(toke);
  };
  const menu = useSelector(state => state.data.menu);
  const dispatch = useDispatch();
  const handleMenu = () => {
    console.log('called 1');
    let data = JSON.stringify({
      query: `query{
     
        menu(handle: "main-menu") {
          id
          handle
          title
          items {
            
              id
              title
              resourceId
              tags
              url
              type
              items{
                  id
                  resourceId
                  title
                  url
              }}}}`,
      variables: {},
    });
    dispatch({
      type: 'sopify/fetchMenu',
      data,
      navigation,
    });
  };
  const handleLogin = async () => {
    if (token != null) {
      await AsyncStorage.clear();
      navigation.replace('Home');
    } else {
      navigation.replace('Login');
    }
  };
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#e6f0f2',
        paddingBottom: wp(2),
      }}>
      <View style={[styles.container, {borderWidth: 0}]}>
        <Feather
          onPress={() => {
            if (menu === null) {
              handleMenu();
            } else {
              navigation.openDrawer();
            }
          }}
          name="menu"
          style={{fontSize: wp(9), marginLeft: '4%', color: 'black'}}
        />
        <Image
          style={{
            height: hp(10),
            width: hp(10),
            left: wp(20),
            marginRight: wp(25),
          }}
          source={{
            uri: `https://cdn.shopify.com/s/files/1/0548/9570/6327/files/Wholespoon_logo_180x.png?v=1632130611`,
          }}
        />
        <View style={styles.container2}>
          <AntDesign name="search1" size={wp(5.6)} color="black" />
          <FontAwesome5
            name={token ? 'log-out' : 'login'}
            size={wp(6)}
            color="grey"
            onPress={() => {
              handleLogin();
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default Header;
{
  /* <View style={styles.search}>
         
          <TextInput
            placeholder="Search...."
            style={{
              flex: 1,
              fontSize: wp(3.7),
              marginLeft: '3%',
            }}
            placeholderTextColor={'grey'}
          />
        </View> */
}
