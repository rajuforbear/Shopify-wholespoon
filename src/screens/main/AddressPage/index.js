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
import {useDispatch, useSelector} from 'react-redux';
import Shopify from '../../../sopify/API/Shopify';

const Address = ({navigation}) => {
  const dispatch = useDispatch();
  const checkout = useSelector(state => state.data.checkoutData);
  const [address, setAddress] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    country: '',
    province: '',
    phone: '',
    zip: '',
  });
  const handleonSubmit = (text, input) => {
    setAddress(prev => ({...prev, [text]: input}));
  };

  console.log(address.city);
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
        <Input
          lable="first name*"
          value={address.firstName}
          onChangeText={input => {
            handleonSubmit('firstName', input);
          }}
        />
        <Input
          lable="Last name*"
          value={address.lastName}
          onChangeText={input => {
            handleonSubmit('lastName', input);
          }}
        />
        <Input
          lable="Mobile No*"
          value={address.phone}
          onChangeText={input => {
            handleonSubmit('phone', input);
          }}
        />
        <Input
          lable="Email*"
          value={address.email}
          onChangeText={input => {
            handleonSubmit('email', input);
          }}
        />
        <View style={styles.contact}>
          <Text style={styles.cont}>ADDRESS</Text>
        </View>
        <Input
          lable="Pin Code*"
          value={address.zip}
          onChangeText={input => {
            handleonSubmit('zip', input);
          }}
        />
        <Input
          notlable
          placeholder="Address (House NO,Building,Street,Area)*"
          value={address.address1}
          onChangeText={input => {
            handleonSubmit('address1', input);
          }}
        />
        <Input
          notlable
          placeholder="Address(2) (House NO,Building,Street,Area)"
          value={address.address2}
          onChangeText={input => handleonSubmit('address2', input)}
        />

        <Input
          notlable
          placeholder="City"
          value={address.city}
          onChangeText={input => {
            handleonSubmit('city', input);
          }}
        />
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
              // backgroundColor: 'white',
              width: wp(45),
              borderRadius: wp(2),
              paddingHorizontal: wp(3),
              borderWidth: wp(0.1),
            }}>
            <TextInput
              value={address.country}
              placeholder="Country"
              onChangeText={input => handleonSubmit('country', input)}
              style={{flex: 1, fontSize: wp(4)}}
            />
          </View>
          <View
            style={{
              height: hp(5.6),
              justifyContent: 'center',
              // backgroundColor: 'lightgrey',
              width: wp(45),
              borderRadius: wp(2),
              marginLeft: wp(3),
              borderWidth: wp(0.1),
              paddingHorizontal: wp(3),
            }}>
            <TextInput
              placeholder="State"
              style={{flex: 1, fontSize: wp(4)}}
              value={address.province}
              onChangeText={input => {
                handleonSubmit('province', input);
              }}
            />
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
              delete address.email;
              let check = checkout.id;
              dispatch({
                type: 'sopify/addAdress',
                address,
                check,
                navigation,
              });
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
