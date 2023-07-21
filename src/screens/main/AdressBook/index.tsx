import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../../compoents/Loader';
import {StackScreenProps} from '@react-navigation/stack';
import {HelperNavigationParams} from '../../../navigation/Helper/Helper';
import {RootState} from '../../../sopify/Redux/store';
import {Node} from '../../../Types/user';
type Props = StackScreenProps<HelperNavigationParams, 'AddressBook'>;
const AddressBook: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.data.userData);
  const isLoading = useSelector((state: RootState) => state.data.isLoading);
  const deleteAddress = async (id: string) => {
    const userToke = await AsyncStorage.getItem('Token');
    let data = JSON.stringify({
      query: `mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
      customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
        customerUserErrors {
          code
          field
          message
        }
        deletedCustomerAddressId
        
      }
    }`,
      variables: {
        customerAccessToken: userToke,
        id: id,
      },
    });
    dispatch({
      type: 'sopify/deleteAddress',
      data: data,
      token: userToke,
      navigation,
    });
  };
  const editAddress = (item: Node) => {
    navigation.navigate('Address', {data: item});
  };
  const setDefaultAddress = async (id: string) => {
    const userToken = await AsyncStorage.getItem('Token');
    let data = JSON.stringify({
      query: `mutation customerDefaultAddressUpdate($addressId: ID!, $customerAccessToken: String!) {
      customerDefaultAddressUpdate(addressId: $addressId, customerAccessToken: $customerAccessToken) {
        customer {
             firstName
        }
        customerUserErrors {
          code
          field
          message
        }
      } 
  }`,
      variables: {
        addressId: id,
        customerAccessToken: userToken,
      },
    });
    dispatch({
      type: 'sopify/setDefaulAddress',
      data: data,
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      <ScrollView contentContainerStyle={{paddingBottom: wp(14)}}>
        <Text style={styles.address}>Your Addresses</Text>
        <View style={styles.line}></View>
        <View style={{alignSelf: 'center', marginTop: wp(5)}}>
          <FlatList
            scrollEnabled={false}
            data={userData?.addresses?.nodes}
            keyExtractor={(item, index) => item.id}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    paddingVertical: wp(3),
                    width: wp(95),
                    borderWidth: wp(0.1),
                    marginVertical: wp(1),
                    paddingLeft: wp(10),
                    borderRadius: wp(1),
                    //backgroundColor: '#787878',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      index != 0 ? setDefaultAddress(item.id) : null
                    }>
                    <Text
                      style={[
                        styles.default,
                        {
                          color:
                            userData.defaultAddress.id === item.id
                              ? 'black'
                              : '#D9C5AA',
                        },
                      ]}>
                      {userData.defaultAddress.id == item.id ? 'Default' : null}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.adText}>{item?.firstName}</Text>
                  <Text style={styles.adText}>{item?.lastName}</Text>
                  {item.phone ? (
                    <Text style={styles.adText}>{item?.phone}</Text>
                  ) : null}
                  {item.company ? (
                    <Text style={styles.adText}>{item?.company}</Text>
                  ) : null}
                  <Text style={styles.adText}>{item?.address1}</Text>
                  {item.address2 ? (
                    <Text style={styles.adText}>{item?.address2}</Text>
                  ) : null}

                  <View style={{flexDirection: 'row'}}>
                    {item.zip ? (
                      <Text style={styles.adText}>{item.zip}</Text>
                    ) : null}
                    {item.city ? (
                      <Text style={styles.adText}>{' ' + item.city}</Text>
                    ) : null}
                    {item.province ? (
                      <Text style={styles.adText}>{'   ' + item.province}</Text>
                    ) : null}
                  </View>
                  {item.country ? (
                    <Text style={styles.adText}>{item?.country}</Text>
                  ) : null}
                  <View
                    style={{
                      width: '10%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: wp(4),

                      marginRight: wp(10),
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        editAddress(item);
                      }}
                      style={styles.btn}>
                      <Text style={styles.btnText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                      <Text
                        onPress={() => deleteAddress(item.id)}
                        style={styles.btnText}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
      <AntDesign
        onPress={() => {
          navigation.navigate('Address', {data: undefined as any});
        }}
        name="pluscircle"
        style={styles.plusIcon}
      />
    </View>
  );
};

export default AddressBook;
