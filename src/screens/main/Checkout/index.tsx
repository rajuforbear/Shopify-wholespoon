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
import Loading from '../../../compoents/Loader';
import { StackScreenProps } from '@react-navigation/stack';
import { HelperNavigationParams } from '../../../navigation/Helper/Helper';
import { RootState } from '../../../sopify/Redux/store';
type Props=StackScreenProps<HelperNavigationParams>
const Checkout:React.FC<Props> = ({navigation}) => {
  const iseSevedAddres = useSelector(
    (state:RootState)=> state.data.userData?.addresses?.nodes,
  );
  const updateCheckout=useSelector((state:RootState)=>state.data.updateCheckout)
  console.log('this is chekcu',updateCheckout)
  const dispatch = useDispatch();
  const [isEdited, setIsEdited] = useState(false);
  const checkout = useSelector((state:RootState) => state.data.checkoutData);
  const isLoading = useSelector((state:RootState) => state.data.isLoading);
  console.log(isLoading);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const useData = useSelector((state:RootState) => state.data.userData)
  const [address, setAddress] = React.useState({
    firstName: useData?.defaultAddress?.firstName
      ? useData?.defaultAddress?.firstName
      : '',
    lastName: useData?.defaultAddress?.lastName
      ? useData?.defaultAddress?.lastName
      : '',
    company: useData?.defaultAddress?.company
      ? useData?.defaultAddress?.company
      : '',
    address1: useData?.defaultAddress?.address1
      ? useData?.defaultAddress?.address1
      : '',
    address2: useData?.defaultAddress?.address2
      ? useData?.defaultAddress?.address2
      : '',
    city: useData?.defaultAddress?.city ? useData?.defaultAddress?.city : '',
    country: useData?.defaultAddress?.country
      ? useData?.defaultAddress?.country
      : '',
    province: useData?.defaultAddress?.province
      ? useData?.defaultAddress?.province
      : '',
    phone: useData?.defaultAddress?.phone ? useData?.defaultAddress?.phone : '',
    zip: useData?.defaultAddress?.zip ? useData?.defaultAddress?.zip : '',
  });
  

  useEffect(() => {
    getAddress();
  }, []);
  const getAddress = async () => {
    if (iseSevedAddres?.length > 0) {
      setSHow(true);
    }

    return false;
  };
  const handleonSubmit = (text:string, input:string) => {
    setAddress(prev => ({...prev, [text]: input}));
  };
  const [show, setSHow] = useState(false);

  const itemprice = (price:string) => {
    // console.log(checkout?.lineItems?.edges[0].node?.variant?.price?.amount);
    let amount = 0;
    checkout?.lineItems?.edges?.map((item, index) => {
      amount =
        amount +
       item?.node?.quantity * parseInt(item?.node?.variant?.price?.amount);
    });
    if (price === '') return '₹ ' + amount;
    return amount + parseInt(price);
  };
  const countries = ['India', 'Canada', 'Australia', 'Ireland'];

  const createAddress = async () => {
    const userToke = await AsyncStorage.getItem('Token');

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
        address: address,
        customerAccessToken: userToke,
      },
    });
    dispatch({
      type: 'sopify/addAdress',
      data: data1,
      navigation,
      msg: 'Adress Added Succesfully',
      token: userToke,
      op: 'create',
    });
  };
  const editAddress = async () => {
    const userToke = await AsyncStorage.getItem('Token');
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
        address: address,
        customerAccessToken: userToke,
        id: useData.defaultAddress?.id,
      },
    });
    dispatch({
      type: 'sopify/updateAddress',
      data: data2,
      navigation,
      msg: 'Address updated Successfully',
      token: userToke,
      op: 'create',
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      {/* <View style={styles.header}>
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
      </View> */}
      <ScrollView contentContainerStyle={{paddingBottom: wp(20)}}>
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
            {itemprice('')}
          </Text>
        </View>

        {show ? (
          <View style={{paddingVertical: wp(2), backgroundColor: '#FAFAFA'}}>
            <FlatList
              scrollEnabled={false}
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
                          item.node.variant.price.amount) * item.node.quantity
                        }
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
                {itemprice('')}
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
        {iseSevedAddres?.length <= 0 || iseSevedAddres===undefined|| isEdited ? (
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
              lable=''
              notInput={false}
              lable2=''
            />
            <Input
              notlable
              placeholder="Company"
              value={address.company}
              onChangeText={input => {
                handleonSubmit('company', input);
              }}
              lable=''
              lable2=''
              notInput={false}
            />
            <View style={styles.contact}>
              <Text style={styles.cont}>Shipping Address</Text>
            </View>
            <View style={styles.inputfield2}>
              <SelectDropdown
                
                data={countries}
                defaultButtonText="Country"
                dropdownStyle={{
                  width: '100%',
                }}
                onSelect={(selectedItem, index) => {
                  handleonSubmit('country', selectedItem);
                }}
                // dropdownOverlayColor="red"
               
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
              lable=''
              lable2=''
              notInput={false}
            />
            <Input
              notlable
              placeholder="Address(2) (House NO,Building,Street,Area)"
              value={address.address2}
              onChangeText={input => handleonSubmit('address2', input)}
              lable=''
              lable2=''
              notInput={false}
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
                  height: hp(5.5),
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
                  height: hp(5.5),
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
                  height: hp(5.5),
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

           
          </View>
        ) : (
          <View style={{marginTop: hp(3)}}>
            <View
              style={{
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
              <View style={{width: '66%'}}>
                <Text style={{fontSize: wp(4), fontWeight: '600'}}>
                  {useData.defaultAddress?.phone + '\n' + useData.email}
                </Text>
              </View>
              <Text
                onPress={() => {
                  setAddress(useData.defaultAddress);

                  setSHow(false);
                }}
                style={{
                  fontSize: wp(4),
                  fontWeight: '400',
                  textDecorationLine: 'underline',
                  color: '#A36B25',
                }}>
                {null}
              </Text>
            </View>
            <View
              style={{
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
              <View style={{width: '50%'}}>
                <Text
                  style={{fontSize: wp(4), fontWeight: '600', color: 'black'}}>
                  {useData?.defaultAddress?.address1 +
                    ', ' +
                    useData.defaultAddress?.city +
                    ', ' +
                    useData.defaultAddress?.province +
                    ', ' +
                    useData.defaultAddress?.country +
                    ', ' +
                    useData.defaultAddress?.zip}
                </Text>
              </View>
              <Text
                onPress={() => {
                  setIsEdited(true);

                  setSHow(false);
                }}
                style={{
                  fontSize: wp(4),
                  fontWeight: '400',
                  textDecorationLine: 'underline',
                  color: '#A36B25',
                }}>
                Change
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
            // if (toggleCheckBox) {
            //   console.log('this is saved');
            // }
            // if (iseSevedAddres.length > 0) {
            //   setSHow(true);
            // } else {
            //   createAddress();
            // }
            if (iseSevedAddres?.length <= 0) {
              setSHow(true);
              createAddress();
            } else if (isEdited) {
              editAddress();
              setSHow(true);
              setIsEdited(false);
            } else {
              dispatch({
                type: 'sopify/updateCheckout',
                id: checkout?.id,
                address: address,
              });
            }
          }}
          style={styles.btn2}>
          <Text style={{color: 'white', fontWeight: '500', fontSize: wp(3.5)}}>
            {iseSevedAddres?.length <= 0 || isEdited
              ? 'Continue Shipping'
              : 'Continue for Payment'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Checkout;
