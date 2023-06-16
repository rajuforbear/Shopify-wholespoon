import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottumTab from '../../../compoents/BottumTab';
import styles from './styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Mat from 'react-native-vector-icons/MaterialCommunityIcons';
import {Products} from '../../../data/Products';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../../compoents/Loader';
import CheckBox from '@react-native-community/checkbox';
import {query} from './queries';
import Shopify from '../../../sopify/API/Shopify';

const Cart = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const cartItem = useSelector(state => state.data.cartItem);
  console.log('this ithe', cartItem);
  const isLoading = useSelector(state => state.data.isLoading);
  const [selectedItem, setSelectedItem] = useState(
    new Array(cartItem?.lines.edges.length).fill({checked: false}),
  );
  const [lineItems, setLineItem] = useState([]);
  const [verient, setVerient] = useState([]);
  const userData = useSelector(state => state.data.userData);
  const [selectedItemPrice, setSelectedItemPrice] = useState([]);

  //console.log('this is cart Item', JSON.stringify(cartItem?.lines.edges));

  //  console.log('this is cart item from cart page', JSON.stringify(cartItem));
  useEffect(() => {
    getCartItem();
  }, [isFocused]);
  const getCartItem = async () => {
    const cartId = await AsyncStorage.getItem('cartId');

    let data = JSON.stringify({
      query: `{
      cart(id:${JSON.stringify(cartId)}) {
       ${query}
    }
  }
    }`,
      variables: {},
    });
    dispatch({
      type: 'sopify/getCartItem',
      data: data,
    });
  };

  const createCheckout = async () => {
    let varients = [];
    await cartItem?.lines?.edges?.map((item, index) => {
      let variant = {
        variantId: item.node.merchandise.id,
        quantity: item.node.quantity,
      };
      varients.push(variant);
    });
    let data = JSON.stringify({
      query: `mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id 
            lineItemsSubtotalPrice{
                amount
                currencyCode
            }
            lineItems(first:10){
              
                edges{
                    node{
                       id
                       quantity
                       title
                      variant{
                          id
                          image{
                              id
                              url
                          }
                          price{
                            amount
                            currencyCode
                        }
                      }
      
      
                    }
                }
            }
          }
          checkoutUserErrors {
             field
            message
          }
          queueToken
        }
      }`,
      variables: {
        input: {
          allowPartialAddresses: true,
          buyerIdentity: {countryCode: 'CA'},
          email: userData.email,
          lineItems: varients,
        },
        queueToken: '',
      },
    });
    dispatch({
      type: 'sopify/createCheckout',
      data: data,
      navigation,
    });
  };
  const selectItem = (position, id, price, line) => {
    var lines = lineItems;
    var verients = verient;
    var tempPrice = selectedItemPrice;
    //console.log(selectedItem.includes(position));
    if (selectedItem.includes(position)) {
      lines = lineItems.filter((item, index) => {
        return item != id;
      });
      verients = verient.filter((item, index) => {
        return item.variantId != line.variantId;
      });
      tempPrice = selectedItemPrice.filter((item, index) => {
        item != price;
      });

      let unlike = selectedItem.filter(elem => elem !== position);
      setSelectedItem(unlike);
    } else {
      setSelectedItem([...selectedItem, position]);
      lines.push(id);
      verients.push(line);
      tempPrice.push(price);
    }
    setLineItem(lines);
    setVerient(verients);
    setSelectedItemPrice(tempPrice);
    //setSelectedAmouunt(selectedAmout);
  };
  //console.log(verient);
  const cartItemRemove = async id => {
    let arr = lineItems;

    const cartId = await AsyncStorage.getItem('cartId');
    let data = JSON.stringify({
      query: `mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart  {
       ${query}
    }
    }
        userErrors {
          field
          message
        }
      }
    }`,
      variables: {
        cartId: cartId,
        lineIds: id,
      },
    });
    dispatch({
      type: 'sopify/cartItemRemove',
      data: data,
    });
    // getCartItem();
  };
  const handleRemove = id => {
    cartItemRemove(id);
  };
  //console.log(JSON.stringify(cartItem));
  const itemPrice = () => {
    let selectedAmout = 0;
    let bool = false;
    for (let i = 0; i < verient.length; i++) {
      selectedAmout =
        selectedAmout + parseInt(verient[i].quantity * selectedItemPrice[i]);
      bool = true;
    }
    if (bool) {
      return selectedAmout;
    }

    return 0;
  };
  //console.log(verient);

  const cartLineUpdate = async lines => {
    const cartId = await AsyncStorage.getItem('cartId');
    let data = JSON.stringify({
      query: `mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
            ${query}
    }
          
        }
        userErrors {
          field
          message
        }
      }
    }`,
      variables: {
        cartId: cartId,
        lines: [
          {
            attributes: [{key: 'messege', value: 'true'}],
            merchandiseId: lines.verId,
            quantity: lines.quantity,
            id: lines.cartLineId,
          },
        ],
      },
    });
    dispatch({
      type: 'sopify/updateCart',
      data: data,
    });
    //console.log(lines.quantity); //quantity
  };
  //  console.log(JSON.stringify(cartItem));//variantId
  console.log(verient);

  return (
    <View style={{flex: 1, backgroundColor: '#e6f0f2'}}>
      {isLoading ? <Loading /> : null}

      {/* <View style={styles.header}>
        <View style={styles.back}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={wp(5.9)}
            color="black"
          />
        </View>
        <Text
          style={{
            fontSize: wp(5),
            color: 'black',
            alignSelf: 'center',
            marginLeft: wp(25),
            fontWeight: 'bold',
          }}>
          Your Cart
        </Text>
        {/* <AntDesign name="hearto" style={{fontSize: wp(6), color: 'grey'}} /> 
      </View> */}
      {cartItem ? (
        <View style={{flex: 1}}>
          {/* <View style={{paddingVertical: wp(1), backgroundColor: 'red'}}>
          <View style={styles.item}>
            <View style={styles.cardCont}>
              <Ionicons
                onPress={() => {}}
                name="ios-checkbox-outline"
                size={wp(6.9)}
                color="green"
              />
              <Text style={{fontSize: wp(4)}}>
                {lineItems.length}/{cartItem?.lines.edges.length} Items Selected
              </Text>
            </View>
            <View style={[styles.cardCont, {width: wp(25)}]}>
              <Entypo name="share" size={wp(5.6)} color="grey" />
              <AntDesign
                onPress={() => handleRemove(lineItems)}
                name="delete"
                size={wp(5.6)}
                color="grey"
              />
              <Mat name="heart-plus-outline" size={wp(6.6)} color="grey" />
            </View>
          </View>
          <Text style={{marginLeft: wp(5), fontSize: wp(4)}}>
            Subtotal : ₹{cartItem?.cost?.subtotalAmount?.amount}
          </Text>
          <Text style={{marginLeft: wp(5), fontSize: wp(4), marginTop: wp(1)}}>
            Selected item Price : {itemPrice()}
          </Text>
        </View> */}

          <FlatList
            data={cartItem?.lines.edges}
            //scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            onEndReached={() => {
              console.log('ended');
            }}
            renderItem={({item, index}) => {
              return (
                <View style={styles.listContainer}>
                  <View style={styles.imgContainer}>
                    <Image
                      style={styles.img}
                      source={{
                        uri: item?.node.merchandise.product?.featuredImage.url,
                      }}
                    />
                  </View>

                  <View style={styles.itemContainer}>
                    <View style={{height: hp(5)}}>
                      <Text
                        style={{
                          marginTop: '5%',
                          fontSize: wp(4),
                          fontWeight: '400',
                        }}>
                        {item?.node.merchandise.product?.title?.substring(
                          0,
                          19,
                        )}
                        ...
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginVertical: wp(1)}}>
                      <Text
                        style={{
                          marginTop: '2%',
                          // fontWeight: 'bold',
                          color: 'black',
                          fontSize: wp(3.9),
                        }}>
                        {'  ₹'}
                        <Text style={{fontSize: wp(4.5), fontWeight: 'bold'}}>
                          {+item?.node.merchandise.product?.priceRange
                            .maxVariantPrice.amount + '.00'}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          marginTop: '2%',
                          // fontWeight: 'bold',
                          color: 'black',
                          fontSize: wp(3.5),
                          textDecorationLine: 'line-through',
                          color: 'grey',
                        }}>
                        {'   '}₹
                        <Text
                          style={{
                            fontSize: wp(4.5),
                            fontWeight: 'bold',
                          }}>
                          {2 *
                            parseInt(
                              item?.node.merchandise.product?.priceRange
                                .maxVariantPrice.amount,
                            )}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          marginTop: '2%',
                          //fontWeight: '800',
                          color: '#CC0066',
                          fontSize: wp(3),
                          marginLeft: '3%',
                        }}>
                        50%
                      </Text>
                    </View>

                    <Text style={{marginLeft: '3%', color: 'grey'}}>
                      14 days return policy
                    </Text>
                    <View style={styles.btnContainer}>
                      <View style={styles.quantityContainer}>
                        <TouchableOpacity
                          onPress={() =>
                            cartLineUpdate({
                              verId: item.node.merchandise.id,
                              quantity: parseInt(item.node.quantity) - 1,
                              cartLineId: item.node.id,
                            })
                          }
                          style={styles.quantity}>
                          {item.node.quantity >= 2 ? (
                            <Entypo name="minus" size={wp(4.5)} />
                          ) : (
                            <Mat name="delete-outline" size={wp(6.5)} />
                          )}
                        </TouchableOpacity>
                        <View
                          style={{
                            height: '100%',
                            backgroundColor: 'lightgrey',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40%',
                          }}>
                          <Text style={{fontSize: wp(4), fontWeight: '600'}}>
                            {item.node.quantity}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() =>
                            cartLineUpdate({
                              verId: item.node.merchandise.id,
                              quantity: parseInt(item.node.quantity) + 1,
                              cartLineId: item.node.id,
                            })
                          }
                          style={styles.quantity}>
                          <Entypo name="plus" size={wp(4.5)} />
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          handleRemove(item.node.id);
                        }}
                        style={styles.delebtn}>
                        <Text style={{color: 'grey', fontSize: wp(3.5)}}>
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/* <TouchableOpacity
                  onPress={() => {
                    selectItem(
                      index,
                      item.node.id,
                      item.node.cost.amountPerQuantity.amount,
                      {
                        variantId: item.node.merchandise.id,
                        quantity: item.node.quantity,
                      },
                    );
                  }}
                  style={[
                    styles.checkbox,
                    selectedItem.includes(index)
                      ? {backgroundColor: 'green', borderColor: 'green'}
                      : null,
                  ]}>
                  <Entypo
                    name={selectedItem.includes(index) ? 'check' : 'check'}
                    size={wp(4)}
                    color="white"
                  />
                </TouchableOpacity> */}
                </View>
              );
            }}
          />

          <View style={styles.placeContainer}>
            <TouchableOpacity
              onPress={
                () =>
                  //
                  createCheckout()
                // Shopify.getCountryList()
                // dispatch({
                //   type: 'sopify/getCheckout',
                //   navigation,
                // })
              }
              style={styles.btn}>
              <Text style={styles.btnText}>CHEKOUT</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: wp(5), fontWeight: '700', color: 'grey'}}>
            Your Cart Is Empty
          </Text>
        </View>
      )}
    </View>
  );
};
export default Cart;
