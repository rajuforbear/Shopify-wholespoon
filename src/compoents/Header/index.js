import React from 'react';
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
import Ionicons from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation, StackActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const header = () => {
  const navigation = useNavigation();
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
  return (
    <View style={{width: '100%', backgroundColor: '#e6f0f2'}}>
      <View style={[styles.container]}>
        <Feather
          onPress={() => {
            if (menu === null) {
              handleMenu();
            } else {
              navigation.openDrawer();
            }
          }}
          name="menu"
          style={{fontSize: wp(9), marginLeft: '2%', color: 'black'}}
        />
        <View style={styles.search}>
          <AntDesign name="search1" size={wp(5.6)} color="black" />
          <TextInput
            placeholder="Search...."
            style={{
              flex: 1,
              fontSize: wp(3.7),
              marginLeft: '3%',
            }}
            placeholderTextColor={'grey'}
          />
        </View>
        <View
          style={{
            height: '72%',
            width: '11%',
            //borderWidth: 1,
            marginLeft: '6%',
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ebeded',
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.15,
            shadowRadius: 2.84,
          }}>
          <Ionicons name="bell" size={wp(6)} color="black" />
        </View>
      </View>
    </View>
  );
};
export default header;
