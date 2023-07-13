import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FlatList} from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { RootState } from '../../../sopify/Redux/store';
import { StackScreenProps } from '@react-navigation/stack';
import { HelperNavigationParams } from '../../../navigation/Helper';
type Props = StackScreenProps<HelperNavigationParams, 'OrderList'>;
const OrderList:React.FC<Props> = ({navigation}) => {
const products=  useSelector((state:RootState)=>state.data.products)
  return (
    <View style={styles.container}>
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
            size={wp(5)}
            color="grey"
          />
          <Text style={styles.txt}>{'   '}My Orders</Text>
        </View>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item, index) => item.id}
        renderItem={({item, index}) => {
          return (
            <View style={styles.listCard}>
              <Image style={styles.img} source={{uri:item.images[0].src}} />
              <View style={{height: hp(12), marginLeft: wp(10)}}>
                <Text style={{fontWeight: '500', fontSize: wp(4)}}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    marginVertical: wp(1),
                    fontSize: wp(4),
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  ORDER ID : <Text style={{fontWeight: '300'}}>#453333</Text>
                </Text>
                <Text
                  style={{
                    fontSize: wp(4),
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  STATUS : <Text style={{fontWeight: '300'}}> Pending</Text>
                </Text>
                <Text
                  style={{fontSize: wp(4), color: 'green', marginTop: wp(3)}}>
                  {item.variants[0].price.amount}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  height: hp(4),
                  width: wp(30),
                  backgroundColor: 'green',
                  position: 'absolute',
                  right: wp(15),
                  bottom: wp(6),
                  borderRadius: wp(1),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontWeight: 'bold', color: 'white'}}>
                  ORDER DETAILS
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default OrderList;
