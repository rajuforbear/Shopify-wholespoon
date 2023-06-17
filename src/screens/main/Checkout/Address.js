import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import CheckBox from '@react-native-community/checkbox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Input from './component';
import SelectDropdown from 'react-native-select-dropdown';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Shopify from '../../../sopify/API/Shopify';
import {getSessionToken} from '@shopify/app-bridge/utilities';
import {App} from '../../../sopify/API/client';

const Address = () => {
  const test = async () => {
    console.log('called');
    const der = await getSessionToken(App);
    console.log(der);

    console.log('end');
  };
  const countries = ['India', 'Canada', 'Australia', 'Ireland'];
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
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
  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{paddingBottom: wp(20)}}>
        <View>
          <View style={[styles.contact, {marginTop: wp(4)}]}>
            <Text style={styles.cont}>Contact</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: wp(3),
              // borderWidth: 1,
              marginHorizontal: wp(2),
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
                placeholder="Firstname*"
                value={address.firstName}
                onChangeText={input => {
                  handleonSubmit('firstName', input);
                }}
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
                placeholder="Lastname*"
                value={address.lastName}
                onChangeText={input => {
                  handleonSubmit('lastName', input);
                }}
              />
            </View>
          </View>

          <Input
            notlable
            placeholder="Mobile/Phone*"
            value={address.phone}
            onChangeText={input => {
              handleonSubmit('phone', input);
            }}
          />
          <Input
            notlable
            placeholder="Email*"
            value={address.email}
            onChangeText={input => {
              handleonSubmit('email', input);
            }}
          />
          <View style={styles.contact}>
            <Text style={styles.cont}>Shipping Address</Text>
          </View>
          <View style={styles.inputfield2}>
            <SelectDropdown
              title="selexr"
              data={countries}
              defaultButtonText="Country"
              dropdownStyle={{
                width: '100%',
              }}
              onSelect={(selectedItem, index) => {
                handleonSubmit('country', selectedItem);
              }}
              // dropdownOverlayColor="red"
              style={{
                button: {
                  backgroundColor: 'red',
                },
              }}
            />
            <Fontisto
              name="angle-down"
              size={wp(4)}
              style={{marginRight: wp(4)}}
            />
          </View>

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

          <View
            style={{
              flexDirection: 'row',
              marginVertical: wp(3),
              // borderWidth: 1,
              marginHorizontal: wp(2),
            }}>
            <View
              style={{
                height: hp(5),
                //alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: 'white',
                width: wp(30),
                borderRadius: wp(2),
                paddingHorizontal: wp(3),
                borderWidth: wp(0.1),
              }}>
              <TextInput
                placeholder="City"
                value={address.city}
                onChangeText={input => {
                  handleonSubmit('city', input);
                }}
                style={{flex: 1, fontSize: wp(4)}}
              />
            </View>
            <View
              style={{
                height: hp(5),
                justifyContent: 'center',
                // backgroundColor: 'lightgrey',
                width: wp(30),
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
            <View
              style={{
                height: hp(5),
                justifyContent: 'center',
                // backgroundColor: 'lightgrey',
                width: wp(30),
                borderRadius: wp(2),
                marginLeft: wp(3),
                borderWidth: wp(0.1),
                paddingHorizontal: wp(3),
              }}>
              <TextInput
                placeholder="Pincode"
                style={{flex: 1, fontSize: wp(4)}}
                value={address.zip}
                onChangeText={input => {
                  handleonSubmit('zip', input);
                }}
              />
            </View>
          </View>

          <View
            style={{
              height: hp(5),
              marginHorizontal: wp(3),
              marginVertical: wp(3),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={() => setToggleCheckBox(!toggleCheckBox)}
            /> */}
            {/* <Text style={{fontWeight: '500', marginLeft: wp(2)}}>
              save it for latter
            </Text> */}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            test();
          }}
          style={[styles.btn2, {marginTop: wp(-10)}]}>
          <Text style={{color: 'white', fontWeight: '500', fontSize: wp(4)}}>
            {'Save'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Address;
