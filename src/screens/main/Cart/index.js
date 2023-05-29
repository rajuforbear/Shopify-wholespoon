import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
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

const Cart = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const cartItem = useSelector(state => state.data.cartItem);
  const isLoading = useSelector(state => state.data.isLoading);
  const [selectedItem, setSelectedItem] = useState(
    new Array(cartItem?.lines.edges.length).fill({checked: false}),
  );
  const [lineItems, setLineItem] = useState([]);
  const [verient, setVerient] = useState([]);
  const userData = useSelector(state => state.data.userData);

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
        id
        checkoutUrl
        cost{
          checkoutChargeAmount {
              amount
              currencyCode
          }
          subtotalAmount{
              amount
              currencyCode
          }
          subtotalAmountEstimated
          totalAmount{
              amount
              currencyCode
          }
          totalAmountEstimated
          totalDutyAmount{
              amount
              currencyCode
          }
          totalDutyAmountEstimated
          totalTaxAmount{
              amount
              currencyCode
          }
          totalTaxAmountEstimated
         }
    createdAt
    updatedAt
    lines(first:10) {
      edges {
        node {
      id
    quantity
    merchandise {
    ... on ProductVariant {
    id
    title
    
    
    product{
        title 
        priceRange{
            maxVariantPrice{
                amount
                currencyCode
            }
            minVariantPrice{
                amount
                currencyCode
            }
        }
        availableForSale
        featuredImage{
            url
        }
         images(first:1){
            edges
            {
                node{
                    url
                }
            }
         }
    }
    }
    }
    attributes {
    key
    value
    }
    }
    }
    }
    attributes {
    key
    value
    }
    estimatedCost {
    totalAmount {
    amount
    currencyCode
    }
    subtotalAmount {
    amount
    currencyCode
    }
    totalTaxAmount {
    amount
    currencyCode
    }
    totalDutyAmount {
    amount
    currencyCode
    }
    }
    buyerIdentity {
    email
    phone
    customer {
    id
    }
    countryCode
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

  const createCheckout = () => {
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
          lineItems: verient,
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
  const selectItem = (position, id, line) => {
    var lines = lineItems;
    var verients = verient;
    //console.log(selectedItem.includes(position));
    if (selectedItem.includes(position)) {
      lines = lineItems.filter((item, index) => {
        return item != id;
      });
      verients = verient.filter((item, index) => {
        return index != position;
      });

      let unlike = selectedItem.filter(elem => elem !== position);
      setSelectedItem(unlike);
    } else {
      setSelectedItem([...selectedItem, position]);
      lines.push(id);
      verients.push(line);
      //  selectedAmout.push(priece);
    }
    setLineItem(lines);
    setVerient(verients);
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
        id
        checkoutUrl
        cost{
          checkoutChargeAmount {
              amount
              currencyCode
          }
          subtotalAmount{
              amount
              currencyCode
          }
          subtotalAmountEstimated
          totalAmount{
              amount
              currencyCode
          }
          totalAmountEstimated
          totalDutyAmount{
              amount
              currencyCode
          }
          totalDutyAmountEstimated
          totalTaxAmount{
              amount
              currencyCode
          }
          totalTaxAmountEstimated
         }
    createdAt
    updatedAt
    lines(first:10) {
      edges {
        node {
      id
    quantity
    merchandise {
    ... on ProductVariant {
    id
    title
     
    
    product{
        title 
        sellingPlanGroups(first:1){
            edges{
                node{
                    sellingPlans(first:1){
                        edges{
                            node{
                                id
                            }
                        }
                    }
                }
            }
        }
        priceRange{
            maxVariantPrice{
                amount
                currencyCode
            }
          minVariantPrice{
                amount
                currencyCode
            }
        }
        availableForSale
        featuredImage{
            url
        }
         images(first:1){
            edges
            {
                node{
                    url
                }
            }
         }
    }
    }
    }
    attributes {
    key
    value
    }
    }
    }
    }
    attributes {
    key
    value
    }
    estimatedCost {
    totalAmount {
    amount
    currencyCode
    }
    subtotalAmount {
    amount
    currencyCode
    }
    totalTaxAmount {
    amount
    currencyCode
    }
    totalDutyAmount {
    amount
    currencyCode
    }
    }
    buyerIdentity {
    email
    phone
    customer {
    id
    }
    countryCode
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
  console.log(verient);
  const itemPrice = () => {
    let selectedAmout = 0;
    let bool = false;
    verient.map(item => {
      selectedAmout = selectedAmout + parseInt(item.price * item.quantity);
      bool = true;
    });
    if (bool) {
      return selectedAmout;
    }
    return 0;
  };

  const cartLineUpdate = async lines => {
    const cartId = await AsyncStorage.getItem('cartId');
    let data = JSON.stringify({
      query: `mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
            id
        checkoutUrl
    createdAt
    updatedAt
    lines(first:10) {
      edges {
        node {
      id
    quantity
    merchandise {
    ... on ProductVariant {
    id
    title
    
    
    product{
        title 
        sellingPlanGroups(first:1){
            edges{
                node{
                    sellingPlans(first:1){
                        edges{
                            node{
                                id
                            }
                        }
                    }
                }
            }
        }
        priceRange{
            maxVariantPrice{
                amount
                currencyCode
            }
            minVariantPrice{
                amount
                currencyCode
            }
        }
        availableForSale
        featuredImage{
            url
        }
         images(first:1){
            edges
            {
                node{
                    url
                }
            }
         }
    }
    }
    }
    attributes {
    key
    value
    }
    }
    }
    }
    attributes {
    key
    value
    }
    estimatedCost {
    totalAmount {
    amount
    currencyCode
    }
    subtotalAmount {
    amount
    currencyCode
    }
    totalTaxAmount {
    amount
    currencyCode
    }
    totalDutyAmount {
    amount
    currencyCode
    }
    }
    buyerIdentity {
    email
    phone
    customer {
    id
    }
    countryCode
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
    console.log(lines.quantity);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#e6f0f2'}}>
      {isLoading ? <Loading /> : null}
      <View style={styles.header}>
        <View style={styles.back}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={wp(5.9)}
            color="grey"
          />
          <Text style={{fontSize: wp(4.5), color: 'grey'}}>Shopping Bag</Text>
        </View>
        <AntDesign name="hearto" style={{fontSize: wp(6), color: 'grey'}} />
      </View>
      <View style={{flex: 1}}>
        <View style={{paddingVertical: wp(1), backgroundColor: '#f2f5f4'}}>
          <View style={styles.item}>
            <View style={styles.cardCont}>
              <Ionicons
                onPress={() => {}}
                na69me="ios-checkbox-outline"
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
        </View>

        <FlatList
          data={cartItem?.lines.edges}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
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
                </View>

                <View style={styles.itemContainer}>
                  <View style={{height: hp(5)}}>
                    <Text
                      style={{
                        marginTop: '5%',
                        fontSize: wp(4),
                        fontWeight: '400',
                      }}>
                      {item?.node.merchandise.product?.title}
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
                    <TouchableOpacity
                      onPress={() => {
                        handleRemove(item.node.id);
                      }}
                      style={styles.delebtn}>
                      <Text style={{color: 'grey', fontSize: wp(3.5)}}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.delebtn,
                        {marginLeft: wp(3), width: wp(25)},
                      ]}>
                      <Text style={{color: 'grey', fontSize: wp(3.5)}}>
                        details...
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    selectItem(index, item.node.id, {
                      variantId: item.node.merchandise.id,
                      quantity: item.node.quantity,
                      price:
                        item.node.merchandise.product.priceRange.minVariantPrice
                          .amount,
                    });
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
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <View style={styles.placeContainer}>
          <TouchableOpacity
            onPress={() =>
              //
              createCheckout()
            }
            style={styles.btn}>
            <Text style={styles.btnText}>CHEKOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Cart;
