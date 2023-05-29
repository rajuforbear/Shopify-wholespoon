import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

//img price
const Card = ({item, onPress}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.like}>
          <View style={styles.pr}>
            <Text style={styles.prce}>-23%</Text>
          </View>
          <View style={styles.circle}>
            <Feather name="heart" size={wp(4)} color="black" />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Details', {item})}>
          <Image style={styles.img} source={item.image} />
          <Text
            style={[
              styles.prce,
              {marginLeft: '4%', marginTop: '2%', fontSize: wp(4.5)},
            ]}>
            {item.name.substring(0, 15)}.....
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'space-between',
            marginTop: '4%',
          }}>
          <TouchableOpacity
            style={{
              height: wp(6),
              width: wp(18),
              backgroundColor: '#0f3a8d',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              borderRadius: wp(1),
            }}
            onPress={onPress}>
            <Text style={{alignSelf: 'center', color: 'white'}}>Buy Now</Text>
          </TouchableOpacity>
          <Text style={styles.txt}>{item.price}</Text>
        </View>
      </View>
    </View>
  );
};

export default Card;
const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: wp(60),
    alignItems: 'center',
    justifyContent: 'center',
    //   borderWidth:1,
    alignSelf: 'center',
  },
  itemContainer: {
    height: '90%',
    width: '95%',
    backgroundColor: '#e6f0f2',
    borderRadius: wp(3),
  },
  like: {
    // borderWidth:1,
    height: '15%',
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: '5%',
  },
  circle: {
    height: wp(6),
    width: wp(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(3),
    backgroundColor: 'lightgrey',
  },
  img: {
    height: wp(22),
    width: wp(15),
    left: '30%',
  },
  pr: {
    width: wp(10),
    height: wp(5),
    backgroundColor: 'lightgrey',
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  prce: {
    fontSize: wp(3),
    fontWeight: 'bold',
    color: 'black',
  },
  imgContainer: {
    width: '39%',
    marginTop: '30%',
  },
  txt: {
    alignSelf: 'center',
    fontSize: 15,
    color: 'green',
  },
});
