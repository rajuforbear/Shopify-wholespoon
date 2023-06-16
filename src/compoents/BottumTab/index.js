import React, {useEffect} from 'react';
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
import {query} from '../../screens/main/Cart/queries';
import {useSelector, useDispatch} from 'react-redux';
const BottumTab = ({navigation}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(state => state.data.cartItem);
  console.log('this is the cartItme', cartItem?.lines?.edges?.length);
  useEffect(() => {
    getCartItem();
  }, []);
  const getCartItem = async () => {
    const cartId = await AsyncStorage.getItem('cartId');
    console.log('this is cart item', cartItem);
    let data = JSON.stringify({
      query: `{
      cart(id:${JSON.stringify(cartId)}) {
       ${query}
    }
  }
    }`,
      variables: {},
    });
    dispatch({
      type: 'sopify/getCartItem',
      data: data,
    });
  };
  const renderHome = () => {
    return (
      <View style={[styles.itemConatiner]}>
        <SimpleLineIcons name="home" size={wp(7)} color="black" />
        <Text
          style={{
            textAlign: 'center',
            fontSize: wp(3.5),
            marginTop: wp(1),
            color: 'black',
          }}>
          Home
        </Text>
      </View>
    );
  };
  const renderUser = () => {
    return (
      <View style={[styles.itemConatiner]}>
        <SimpleLineIcons name="user" size={wp(6)} color="black" />
        <Text
          style={{
            textAlign: 'center',
            fontSize: wp(3.5),
            marginTop: wp(1),
            color: 'black',
          }}>
          Profile
        </Text>
      </View>
    );
  };

  const renderCategoties = () => {
    return (
      <View style={[styles.itemConatiner]}>
        <Feather name="grid" size={wp(6)} color="black" />
        <Text
          style={{
            textAlign: 'center',
            fontSize: wp(3.5),
            color: 'black',
            marginTop: wp(1),
          }}>
          Categories
        </Text>
      </View>
    );
  };

  const renderCart = () => {
    return (
      <View style={[styles.itemConatiner]}>
        <Feather color="black" name="shopping-bag" size={wp(7)} />
        {cartItem && cartItem?.lines?.edges?.length ? (
          <View
            style={{
              height: wp(5),
              width: wp(5),
              backgroundColor: 'black',
              position: 'absolute',
              right: wp(4),
              top: wp(-1),
              borderRadius: wp(2.5),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              {cartItem?.lines?.edges?.length}
            </Text>
          </View>
        ) : null}
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
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
          onPress={() => navigation.navigate('HomeScreen')}>
          {renderHome()}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={9}
          onPress={() => navigation.navigate('Categories')}>
          {renderCategoties()}
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
    backgroundColor: '#e6f0f2',
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
