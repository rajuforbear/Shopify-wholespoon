import React from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import BottumTab from '../../../compoents/BottumTab';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Products} from '../../../data/Products';
import Card from '../../../compoents/Card';

const Favorit = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={wp(5.9)}
            color="grey"
          />
          <View style={{marginLeft: wp(4)}}>
            <Text style={styles.txt}>Wishlist</Text>
            <Text style={[styles.txt, {fontSize: wp(3)}]}>0 items</Text>
          </View>
        </View>
        <View style={{marginLeft:wp(45)}}></View>
        <View style={styles.bag}>
          <EvilIcons name="pencil" size={wp(9)} color="grey" />
          <Feather name="shopping-bag" size={wp(6)} color="grey" />
        </View>
      </View>
      <FlatList
        data={Products}
        keyExtractor={(item, index) => index}
        numColumns={2}
        renderItem={({item}) => {
          return <Card item={item} />;
        }}
      />
    </View>
  );
};
export default Favorit;
