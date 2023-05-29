import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Check from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const CostumDrawer = props => {
  const navigation = useNavigation();
  //e6f0f2
  return (
    <DrawerContentScrollView
      contentContainerStyle={{flex: 1, backgroundColor: '#e6f0f2'}}>
      <View
        style={{width: '100%', backgroundColor: 'lightgrey', height: hp(16)}}>
        <View style={styles.dp}>
          <View style={styles.img}>
            <Image
              style={{height: '100%', width: '100%'}}
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
              }}
            />
          </View>
          <View>
            <Text style={[styles.name, {fontSize: 16, fontWeight: '400'}]}>
              welcome
            </Text>
            <Text style={styles.name}>Mr. John</Text>
          </View>
        </View>
        <View style={[styles.DrawerItem, {marginTop: '5%'}]}>
          <View
            style={{
              flexDirection: 'row',
              height: '100%',
              alignItems: 'center',
              left: '15%',
            }}>
            <Icon name="home" size={wp(6)} />
            <Text
              style={{fontSize: wp(4), fontWeight: '500', marginLeft: '5%'}}>
              HOME
            </Text>
          </View>
        </View>
        <View style={[styles.DrawerItem]}>
          <View
            style={{
              flexDirection: 'row',
              height: '100%',
              alignItems: 'center',
              left: '15%',
            }}>
            <Feather name="grid" size={wp(6)} />
            <Text
              style={{fontSize: wp(4), fontWeight: '500', marginLeft: '5%'}}>
              Shop By Category
            </Text>
          </View>
        </View>
        <View style={[styles.DrawerItem]}>
          <View
            style={{
              flexDirection: 'row',
              height: '100%',
              alignItems: 'center',
              left: '15%',
            }}>
            <Check name="sticker-check-outline" size={wp(7)} />
            <Text
              style={{fontSize: wp(4), fontWeight: '500', marginLeft: '5%'}}>
              My Orders
            </Text>
          </View>
        </View>
        <View style={[styles.DrawerItem]}>
          <View
            style={{
              flexDirection: 'row',
              height: '100%',
              alignItems: 'center',
              left: '15%',
            }}>
            <AntDesign name="idcard" size={wp(7.5)} />
            <Text
              style={{fontSize: wp(4), fontWeight: '500', marginLeft: '5%'}}>
              Career
            </Text>
          </View>
        </View>
        <View style={[styles.DrawerItem]}>
          <View
            style={{
              flexDirection: 'row',
              height: '100%',
              alignItems: 'center',
              left: '19%',
            }}>
            <Foundation name="telephone" size={wp(7.5)} />
            <Text
              style={{fontSize: wp(4), fontWeight: '500', marginLeft: '7%'}}>
              Contact Us
            </Text>
          </View>
        </View>
        <View style={[styles.DrawerItem]}>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.removeItem('Token');
              navigation.navigate('Login');
            }}
            style={{
              flexDirection: 'row',
              height: '100%',
              alignItems: 'center',
              left: '19%',
            }}>
            <Foundation name="power" size={wp(7.5)} />
            <Text
              style={{fontSize: wp(4), fontWeight: '500', marginLeft: '7%'}}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingVertical: wp(1),
            backgroundColor: 'lightgrey',
            position: 'absolute',
            top: hp(70),
            width: '100%',
          }}>
          <View style={{marginLeft: wp(14)}}>
            <Text style={styles.terms}>FAQs</Text>
            <Text style={styles.terms}>ABOUT US</Text>
            <Text style={styles.terms}>TERMS OF USE</Text>
            <Text style={styles.terms}>PRIVACY POLICY</Text>
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};
export default CostumDrawer;
const styles = StyleSheet.create({
  dp: {
    height: hp(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Platform.OS === 'ios' ? '75%' : '65%',
    left: '10%',
  },
  img: {
    height: wp(22),
    width: wp(22),
    borderRadius: wp(5.5),
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  name: {
    alignSelf: 'center',
    fontSize: wp(5),
    fontWeight: 'bold',
    color: 'black',
  },
  DrawerItem: {
    height: hp(7),
    borderBottomColor: 'grey',
  },
  terms: {
    fontSize: wp(4),
    fontWeight: '500',
    color: 'grey',
    paddingVertical: wp(1),
  },
});
