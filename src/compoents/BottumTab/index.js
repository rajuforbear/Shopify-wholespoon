import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BottumTab = () => {
  const navigation = useNavigation();
  const renderHome = () => {
    return (
      <View style={[styles.itemConatiner]}>
        <SimpleLineIcons name="home" size={wp(7)} color="white" />
        <Text
          style={{
            textAlign: 'center',
            fontSize: wp(3.5),
            marginTop: wp(1),
            color: 'white',
          }}>
          Home
        </Text>
      </View>
    );
  };
  const renderUser = () => {
    return (
      <View style={[styles.itemConatiner]}>
        <SimpleLineIcons name="user" size={wp(6)} color="white" />
        <Text
          style={{
            textAlign: 'center',
            fontSize: wp(3.5),
            marginTop: wp(1),
            color: 'white',
          }}>
          Profile
        </Text>
      </View>
    );
  };

  const renderCategoties = () => {
    return (
      <View style={[styles.itemConatiner]}>
        <Feather name="grid" size={wp(6)} color="white" />
        <Text
          style={{
            textAlign: 'center',
            fontSize: wp(3.5),
            color: 'white',
            marginTop: wp(1),
          }}>
          Categories
        </Text>
      </View>
    );
  };
  const renderFavorit = () => {
    return (
      <View style={[styles.itemConatiner]}>
        <AntDesign name="hearto" size={wp(7)} color="white" />
        <Text
          style={{
            textAlign: 'center',
            fontSize: wp(3.5),
            color: 'white',
            marginTop: wp(1),
          }}>
          Favorit
        </Text>
      </View>
    );
  };
  const renderCart = () => {
    return (
      <View style={[styles.itemConatiner]}>
        <Feather color="white" name="shopping-bag" size={wp(7)} />
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: wp(3.5),
            marginTop: wp(1),
          }}>
          Cart
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <View style={styles.cont}>
        <TouchableOpacity
          activeOpacity={9}
          onPress={() => navigation.navigate('Home')}>
          {renderHome()}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={9}
          onPress={() => navigation.navigate('Categories')}>
          {renderCategoties()}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={9}
          onPress={() => navigation.navigate('Favorite')}>
          {renderFavorit()}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={9}
          onPress={() => navigation.navigate('Cart')}>
          {renderCart()}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={9}
          onPress={() => navigation.navigate('Profile')}>
          {renderUser()}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottumTab;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#87CEEB',
    height: hp(8),
    position: 'absolute',
    bottom: 0,
    width: '100%',
    //borderWidth:1,
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
  },
  itemConatiner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(18),
  },
  cont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '98%',
  },
});
