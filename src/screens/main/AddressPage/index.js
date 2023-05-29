import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-gesture-handler';
import Input from './component';
import CheckBox from '@react-native-community/checkbox';
import {useSelector} from 'react-redux';
import Shopify from '../../../sopify/API/Shopify';

const Address = ({navigation}) => {
  const checkout = useSelector(state => state.data.checkoutData);

  console.log('this is adress line item', JSON.stringify(checkout));
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
          <Text style={styles.txt}> Add Address</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.contact}>
          <Text style={styles.cont}>CONTACT DETAILS</Text>
        </View>
        <Input lable="Name*" />
        <Input lable="Mobile No*" />
        <Input lable="Alternate Mobile No" />
        <View style={styles.contact}>
          <Text style={styles.cont}>ADDRESS</Text>
        </View>
        <Input lable="Pin Code*" />
        <Input
          notlable
          placeholder="Address (House NO,Building,Street,Area)*"
        />
        <Input
          notlable
          placeholder="Address(2) (House NO,Building,Street,Area)"
        />
        <Input notlable placeholder="Locality/Town" />
        <Input notInput notlable placeholder="Country" />
        <View
          style={{
            flexDirection: 'row',
            marginVertical: wp(3),
            // borderWidth: 1,
            marginHorizontal: wp(3),
          }}>
          <View
            style={{
              height: hp(5.6),
              //alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'lightgrey',
              width: wp(45),
              borderRadius: wp(2),
            }}>
            <Text
              style={{marginLeft: wp(5), fontSize: wp(4), fontWeight: '500'}}>
              City
            </Text>
          </View>
          <View
            style={{
              height: hp(5.6),
              justifyContent: 'center',
              backgroundColor: 'lightgrey',
              width: wp(45),
              borderRadius: wp(2),
              marginLeft: wp(3),
            }}>
            <Text
              style={{marginLeft: wp(5), fontSize: wp(4), fontWeight: '500'}}>
              State
            </Text>
          </View>
        </View>

        <View style={styles.contact}>
          <Text style={styles.cont}>SAVE ADDRESS AS</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: wp(3),
            // borderWidth: 1,
            marginHorizontal: wp(3),
          }}>
          <TouchableOpacity style={styles.btn}>
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, {marginLeft: wp(5)}]}>
            <Text>Work</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: hp(5),
            marginHorizontal: wp(3),
            marginVertical: wp(3),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CheckBox />
          <Text style={{fontWeight: '500', marginLeft: wp(2)}}>
            make this default address
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            //navigation.navigate('Payment')
            {
              let shippingAddress = {
                address1: 'Chestnut Street 92',
                address2: 'Apartment 2',
                city: 'Louisville',
                company: null,
                country: 'United States',
                firstName: 'Bob',
                lastName: 'Norman',
                phone: '555-625-1199',
                province: 'Kentucky',
                zip: '40202',
              };
              let check = lineItems.checkId;
              //console.log('thius is thalayiva', check);
              Shopify.shippingAddress(shippingAddress, check);
            }
          }
          style={styles.btn2}>
          <Text style={{color: 'white', fontWeight: '500', fontSize: wp(3.5)}}>
            SAVE ADDRESS
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Address;
