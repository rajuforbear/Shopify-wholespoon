import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Input from './component';
import SelectDropdown from 'react-native-select-dropdown';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Loading from '../../../compoents/Loader';
const Address = props => {
  const dispatch = useDispatch();
  const data = props.route.params.data;
  const navigation = useNavigation();
  const countries = ['India', 'Canada', 'Australia', 'Ireland'];
  const isLoading = useSelector(state => state.data.isLoading);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [address, setAddress] = React.useState({
    firstName: data.firstName ? data.firstName : '',
    lastName: data.lastName ? data.lastName : '',
    email: data.email ? data.email : '',
    address1: data.address1 ? data.address1 : '',
    address2: data.address2 ? data.address2 : '',
    city: data.city ? data.city : '',
    country: data.country ? data.country : '',
    province: data.province ? data.province : '',
    phone: data.phone ? data.phone : '',
    zip: data.zip ? data.zip : '',
    company: data.company ? data.company : '',
  });
  const handleOnChangeText = (text, input) => {
    setAddress(prev => ({...prev, [text]: input}));
  };
  const handleOnSave = async () => {
    const userToke = await AsyncStorage.getItem('Token');
    if (data === 'add') {
      let data1 = JSON.stringify({
        query: `mutation customerAddressCreate($address: MailingAddressInput!, $customerAccessToken: String!) {
        customerAddressCreate(address: $address, customerAccessToken: $customerAccessToken) {
            
          customerAddress {
            address1
            address2
            city
            company
            countryCodeV2
            firstName
            lastName
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }`,
        variables: {
          address: {
            address1: address.address1,
            address2: address.address2,
            city: address.city,
            company: address.company,
            country: address.country,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            province: address.province,
            zip: address.zip,
          },
          customerAccessToken: userToke,
        },
      });
      dispatch({
        type: 'sopify/addAdress',
        data: data1,
        navigation,
        msg: 'Adress Added Succesfully',
        token: userToke,
      });
    } else {
      let data2 = JSON.stringify({
        query: `mutation customerAddressUpdate($address: MailingAddressInput!, $customerAccessToken: String!, $id: ID!) {
        customerAddressUpdate(address: $address, customerAccessToken: $customerAccessToken, id: $id) {
          customerAddress {
            address1
          }
          customerUserErrors {
            code
            field
            message
            
          }
        }
      }`,
        variables: {
          address: {
            address1: address.address1,
            address2: address.address2,
            city: address.city,
            company: address.company,
            country: address.country,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            province: address.province,
            zip: address.zip,
          },
          customerAccessToken: userToke,
          id: data.id,
        },
      });
      dispatch({
        type: 'sopify/updateAddress',
        data: data2,
        navigation,
        msg: 'Address updated Successfully',
        token: userToke,
      });
    }
  };
  return (
    <View style={{flex: 1}}>
      {isLoading ? <Loading /> : null}
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
                  handleOnChangeText('firstName', input);
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
                  handleOnChangeText('lastName', input);
                }}
              />
            </View>
          </View>

          <Input
            notlable
            placeholder="Mobile/Phone*"
            value={address.phone}
            onChangeText={input => {
              handleOnChangeText('phone', input);
            }}
          />
          <Input
            notlable
            placeholder="Company*"
            value={address.company}
            onChangeText={input => {
              handleOnChangeText('company', input);
            }}
          />
          <View style={styles.contact}>
            <Text style={styles.cont}>Shipping Address</Text>
          </View>
          <View style={styles.inputfield2}>
            <SelectDropdown
              title="selexr"
              data={countries}
              defaultButtonText={data.country ? data.country : 'Country'}
              dropdownStyle={{
                width: '100%',
              }}
              onSelect={(selectedItem, index) => {
                handleOnChangeText('country', selectedItem);
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
              handleOnChangeText('address1', input);
            }}
          />
          <Input
            notlable
            placeholder="Address(2) (House NO,Building,Street,Area)"
            value={address.address2}
            onChangeText={input => handleOnChangeText('address2', input)}
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
                  handleOnChangeText('city', input);
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
                  handleOnChangeText('province', input);
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
                  handleOnChangeText('zip', input);
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
            handleOnSave();
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
