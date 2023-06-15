import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Input from './component';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch, useSelector} from 'react-redux';
import Shopify from '../../../sopify/API/Shopify';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Address = ({navigation}) => {
  const dispatch = useDispatch();
  const checkout = useSelector(state => state.data.checkoutData);
  const checoutAfterAddress = useSelector(state => state.data.checkout);
  const [iseSevedAddres, setIsSavedAddress] = useState({});
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const useData = useSelector(state => state.data.userData);
  //console.log(useData.email);

  //console.log(toggleCheckBox);
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
  useEffect(() => {
    getAddress();
  }, []);
  const getAddress = async () => {
    let add = JSON.parse(await AsyncStorage.getItem('address'));
    setIsSavedAddress(add);
    if (add != null) {
      setSHow(true);
    }

    return false;
  };
  //console.log(iseSevedAddres.email);
  //  console.log('this is checkout data', JSON.stringify(checoutAfterAddress));
  const handleonSubmit = (text, input) => {
    setAddress(prev => ({...prev, [text]: input}));
  };
  const [show, setSHow] = useState(false);

  const itemprice = price => {
    // console.log(checkout?.lineItems?.edges[0].node?.variant?.price?.amount);
    let amount = 0;
    checkout?.lineItems?.edges?.map((item, index) => {
      amount =
        amount +
        parseInt(item?.node?.quantity * item?.node?.variant?.price?.amount);
    });
    if (price === null || price === undefined) return '₹ ' + amount;
    return parseInt(amount) + parseInt(price);
  };
  const countries = ['India', 'Canada', 'Australia', 'Ireland'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={wp(6)}
            color="black"
          />
          <Text style={styles.txt}> Checkout</Text>
          <View style={{width: '20%'}}></View>
        </View>
      </View>
      <ScrollView>
        <View
          style={[
            styles.contact,
            {
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: wp(4),
              backgroundColor: '#F6F6F6',
              height: hp(7),
            },
          ]}>
          <Text
            onPress={() => {
              setSHow(!show);
            }}
            style={{fontSize: wp(4), fontWeight: '600', color: '#A36B25'}}>
            <Feather name="shopping-cart" size={wp(3.5)} />
            {'  '}
            {!show ? 'Show Order Summery' : 'Hide Order Summery'}
            <Entypo
              name={!show ? 'chevron-small-down' : 'chevron-small-up'}
              size={wp(5)}
            />
          </Text>
          <Text
            style={{
              fontSize: wp(4),
              fontWeight: '600',
              color: '#A36B25',
              marginRight: wp(6),
            }}>
            {itemprice()}
          </Text>
        </View>

        {show ? (
          <View style={{paddingVertical: wp(2), backgroundColor: '#FAFAFA'}}>
            <FlatList
              data={checkout?.lineItems?.edges}
              renderItem={({item, index}) => {
                return (
                  <View style={{paddingVertical: wp(2)}}>
                    <View style={styles.mainList}>
                      <View style={styles.listContainer}>
                        <View style={styles.listCircle}>
                          <Text style={styles.quality}>
                            {item.node.quantity}
                          </Text>
                        </View>
                        <View style={styles.listImage}>
                          <Image
                            style={{height: '100%', width: '100%'}}
                            source={{uri: item?.node?.variant.image.url}}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          width: '35%',
                          alignSelf: 'center',
                          marginRight: wp(15),
                        }}>
                        <Text
                          style={{
                            fontSize: wp(3.4),
                            fontWeight: '500',
                            textAlign: 'left',
                          }}>
                          {item.node.title}
                        </Text>
                      </View>
                      <Text
                        style={{
                          marginRight: wp(4),
                          alignSelf: 'center',
                          fontWeight: '500',
                          fontSize: wp(3.5),
                        }}>
                        ₹
                        {parseInt(
                          item.node.variant.price.amount * item.node.quantity,
                        )}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: wp(4),
                  fontWeight: '600',
                  color: 'black',
                  marginVertical: wp(2),
                  marginLeft: wp(3),
                }}>
                Subtotal
              </Text>
              <Text
                style={{
                  fontSize: wp(4),
                  fontWeight: '500',
                  marginRight: wp(4),
                }}>
                {itemprice()}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: wp(4),
                  fontWeight: '600',
                  color: 'black',
                  marginLeft: wp(3),
                }}>
                Shipping
              </Text>
              <Text
                style={{
                  fontSize: wp(4),
                  fontWeight: '500',
                  marginRight: wp(4),
                }}>
                {'₹ 99'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                alignSelf: 'center',
                alignItems: 'center',
                marginTop: wp(3),
              }}>
              <Text
                style={{
                  fontSize: wp(5),
                  fontWeight: '600',
                  color: 'black',
                  marginLeft: wp(3),
                }}>
                Total
              </Text>
              <Text
                style={{
                  fontSize: wp(5),
                  fontWeight: '700',
                  marginRight: wp(3),
                }}>
                <Text style={{fontSize: wp(3.4), color: 'grey'}}>INR</Text>{' '}
                {itemprice('99')}
              </Text>
            </View>
          </View>
        ) : null}
        {iseSevedAddres === null ? (
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
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={() => setToggleCheckBox(!toggleCheckBox)}
              />
              <Text style={{fontWeight: '500', marginLeft: wp(2)}}>
                save it for latter
              </Text>
            </View>
          </View>
        ) : (
          <View style={{marginTop: hp(3)}}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: wp(3),

                marginHorizontal: wp(4),
                flexDirection: 'row',
                paddingHorizontal: wp(4),
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTopWidth: wp(0.1),
                borderRightWidth: wp(0.1),
                borderLeftWidth: wp(0.1),
                borderTopRightRadius: wp(1),
                borderTopLeftRadius: wp(1),
                //borderRadius: wp(1),
              }}>
              <Text style={{fontSize: wp(4), fontWeight: '600', color: 'grey'}}>
                contact
              </Text>
              <Text style={{fontSize: wp(4), fontWeight: '600'}}>
                {iseSevedAddres.email}
              </Text>
              <Text
                onPress={() => {
                  setAddress(iseSevedAddres);
                  setIsSavedAddress(null);
                  setSHow(false);
                }}
                style={{
                  fontSize: wp(4),
                  fontWeight: '400',
                  textDecorationLine: 'underline',
                  color: '#A36B25',
                }}>
                Edit
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: wp(3),
                marginHorizontal: wp(4),
                flexDirection: 'row',
                paddingHorizontal: wp(4),
                alignItems: 'center',
                justifyContent: 'space-between',
                //borderRadius: wp(1),
                borderBottomWidth: wp(0.1),
                borderRightWidth: wp(0.1),
                borderLeftWidth: wp(0.1),
                borderBottomRightRadius: wp(1),
                borderBottomLeftRadius: wp(3),
              }}>
              <Text style={{fontSize: wp(4), fontWeight: '600', color: 'grey'}}>
                ship to
              </Text>
              <View style={{width: '61%'}}>
                <Text
                  style={{fontSize: wp(4), fontWeight: '600', color: 'black'}}>
                  {iseSevedAddres.address1 +
                    ', ' +
                    iseSevedAddres.city +
                    ', ' +
                    iseSevedAddres.province +
                    ', ' +
                    iseSevedAddres.zip}
                </Text>
              </View>
              <Text
                onPress={() => {
                  setAddress(iseSevedAddres);
                  setIsSavedAddress(null);
                  setSHow(false);
                }}
                style={{
                  fontSize: wp(4),
                  fontWeight: '400',
                  textDecorationLine: 'underline',
                  color: '#A36B25',
                }}>
                Edit
              </Text>
            </View>
            <Text
              style={{
                marginLeft: wp(4),
                marginTop: wp(4),
                fontSize: wp(4.5),
                fontWeight: '600',
              }}>
              Shipping Method
            </Text>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: wp(0.1),
                paddingVertical: wp(3),
                marginHorizontal: wp(4),
                marginTop: wp(2),
                borderRadius: wp(1),
                backgroundColor: '#f2ede7',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: wp(3),
              }}>
              <Text
                style={{fontSize: wp(4), fontWeight: '500', color: 'black'}}>
                Outside Delivery
              </Text>
              <Text
                style={{
                  fontSize: wp(4),
                  fontWeight: '500',
                  color: 'black',
                  marginRight: wp(6),
                }}>
                ₹ 99.00
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          onPress={async () => {
            if (toggleCheckBox) {
              await AsyncStorage.setItem('address', JSON.stringify(address));
              console.log('this is saved');
            }
            if (iseSevedAddres === null) {
              setIsSavedAddress(address);
              setSHow(true);
            } else {
              dispatch({
                type: 'sopify/addAdress',
                iseSevedAddres,
                check: checkout.id,
                navigation,
              });
              console.log(iseSevedAddres);
            }
          }}
          style={styles.btn2}>
          <Text style={{color: 'white', fontWeight: '500', fontSize: wp(3.5)}}>
            {iseSevedAddres == null
              ? 'Continue Shipping'
              : 'Continue for Payment'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Address;
