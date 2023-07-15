import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import HTMLView from 'react-native-htmlview';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../../compoents/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {query} from '../Cart/queries';
import {StackScreenProps} from '@react-navigation/stack';
import {HelperNavigationParams} from '../../../navigation/Helper';
import {RootState} from '../../../sopify/Redux/store';
import {CompositeScreenProps} from '@react-navigation/native';
import {NavigationParams} from '../../../navigation';
import productquery from '../../../data/productquery';
type Props = CompositeScreenProps<
  StackScreenProps<HelperNavigationParams, 'Details'>,
  StackScreenProps<NavigationParams, 'Login'>
>;
const Details: React.FC<Props> = ({navigation}) => {
  const [show, setShow] = useState(false);
  const Products = useSelector((state: RootState) => state.data.products);
  const [veriantId, setVariendtId] = useState<string>('');
  const items = useSelector((state: RootState) => state.data.productDetail);

  const [images, setImages] = useState<string[]>([]);

  const dispatch = useDispatch();
  const isFetching = useSelector((state: RootState) => state.data.isLoading);
  const product = useSelector((state: RootState) => state.data.product);
  const [quantity, setQuantity] = useState(1);
  const setArr = () => {
    let arr = [] as string[];
    items?.images.nodes.map((item, index) => {
      arr.push(item.url);
    });
    setImages(arr);
  };
  const [toolbox, setTogleBox] = useState();
  const [variantVlaue, setVariantVlue] = useState(
    items.variants.nodes[0].title,
  );
  useEffect(() => {
    setArr();
  }, [items]);

  const userData = useSelector((state: RootState) => state.data.userData);

  const cartOperation = async () => {
    const cartId = await AsyncStorage.getItem('cartId');
    if (cartId === null || cartId === undefined) {
      createCart();
    } else {
      addItemtoCart();
    }
  };
  const createCart = async () => {
    let data = JSON.stringify({
      query: `mutation {
      cartCreate(
        input: {
          lines: [
            {
              quantity: ${JSON.stringify(quantity)}
              merchandiseId: ${JSON.stringify(veriantId)}
            }
          ],
          # The information about the buyer that's interacting with the cart.
          buyerIdentity: {
            email: ${JSON.stringify(userData?.email)},
            countryCode: CA,
            # An ordered set of delivery addresses associated with the buyer that's interacting with the cart. The rank of the preferences is determined by the order of the addresses in the array. You can use preferences to populate relevant fields in the checkout flow.
           
          }
          attributes: {
            key: "cart_attribute",
            value: "This is a cart attribute"
          }
        }
      ) {
        cart {
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
          lines(first: 10) {
            edges {
              node {
                id
                merchandise {
                  ... on ProductVariant {
                    id
                  }
                }
              }
            }
          }
          buyerIdentity {
            deliveryAddressPreferences {
              __typename
            }
          }
          attributes {
            key
            value
          }
          # The estimated total cost of all merchandise that the customer will pay at checkout.
          cost {
            totalAmount {
              amount
              currencyCode
            }
            # The estimated amount, before taxes and discounts, for the customer to pay at checkout.
            subtotalAmount {
              amount
              currencyCode
            }
            # The estimated tax amount for the customer to pay at checkout.
            totalTaxAmount {
              amount
              currencyCode
            }
            # The estimated duty amount for the customer to pay at checkout.
            totalDutyAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }`,
      variables: {},
    });
    dispatch({
      type: 'sopify/createCart',
      data: data,
      id: 'createCart',
      navigation,
    });
  };
  const fetDetails = (id: string) => {
    const axios = require('axios');
    let data = JSON.stringify({
      query: `query getProductById($id: ID!) {
  product(id: $id) 
  {
    ${productquery}
  }
}`,
      variables: {id: id},
    });
    dispatch({
      type: 'sopify/ProductDetails',
      data: data,
      navigation,
      page: 'details',
    });
  };
  const addItemtoCart = async () => {
    console.log('called');
    const cartId = await AsyncStorage.getItem('cartId');
    let data = JSON.stringify({
      query: `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
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
            attributes: [{key: 'name', value: 'bhai barde'}],
            merchandiseId: veriantId,
            quantity: quantity,
          },
        ],
      },
    });
    dispatch({
      type: 'sopify/createCart',
      data: data,
      id: 'addItem',
      navigation,
    });
  };
  const createThreeButtonAlert = () =>
    Alert.alert('Request Login', 'Please Login', [
      {
        text: 'Ok',
        onPress: () => navigation.navigate('Login'),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  const createCheckout = async () => {
    let verints = {
      variantId: veriantId,
      quantity: quantity,
    };
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
          lineItems: verints,
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

  return (
    <View style={{flex: 1, backgroundColor: '#e6f0f2'}}>
      {isFetching ? <Loading /> : null}

      <View style={styles.details}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: wp(7),
          }}>
          <SliderBox
            images={images}
            dotColor="#fddae8"
            inactiveDotColor="#cccccc"
            dotStyle={{
              width: wp(5),
              height: wp(5),
              borderRadius: 15,
              marginHorizontal: -4,
              padding: 0,
              margin: 0,
              //position:'absolute',
            }}
            imageLoadingColor="#2196F3"
            sliderBoxHeight={300}
          />

          <View style={styles.cont}>
            <View style={[styles.prDeta, {flexDirection: 'row'}]}>
              {/* <Text style={{fontSize: wp(4)}}>Options</Text>

              <EvilIcons name="chevron-down" size={wp(9)} /> */}
              <View style={styles.ratting}>
                <AntDesign name="star" size={wp(3.5)} color="#FFD700" />
                <AntDesign name="star" size={wp(3.5)} color="#FFD700" />
                <AntDesign name="star" size={wp(3.5)} color="#FFD700" />
                <AntDesign name="star" size={wp(3.5)} color="#FFD700" />
                <AntDesign name="staro" size={wp(3.5)} color="#FFD700" />
                <Text style={{fontSize: wp(3)}}>{'(170)'}</Text>
              </View>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
                style={styles.quantity}>
                <Entypo name="minus" size={wp(4.5)} />
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
                  {quantity}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setQuantity(quantity + 1);
                }}
                style={styles.quantity}>
                <Entypo name="plus" size={wp(4.5)} />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              alignSelf: 'center',
              marginVertical: wp(3),
              height: hp(10),
            }}>
            <Text style={styles.title}>{items.title}</Text>
            <FlatList
              data={items.variants.nodes}
              renderItem={({item, index}) => {
                if (item.title === variantVlaue) {
                  setVariendtId(item.id);
                  return (
                    <Text style={[styles.title, {marginVertical: wp(0)}]}>
                      {item?.price.amount +
                        ' ' +
                        item.price.currencyCode +
                        '    '}
                      <Text
                        style={{
                          textDecorationLine: 'line-through',
                          color: 'grey',
                        }}>
                        {item?.compareAtPrice?.amount != null
                          ? '₹' + item?.compareAtPrice?.amount
                          : ''}
                      </Text>
                    </Text>
                  );
                } else {
                  return null;
                }
              }}
            />
          </View>
          <FlatList
            data={items.variants.nodes}
            horizontal={true}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    height: hp(4),
                    width: wp(35),
                    /// borderWidth: 1,
                    // flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginLeft: wp(10),
                  }}>
                  <Text
                    onPress={() => setVariantVlue(item.title)}
                    style={{
                      fontWeight: 'bold',
                      fontSize: wp(4),
                      marginLeft: wp(2),
                    }}>
                    {item.title}
                  </Text>
                  {variantVlaue === item.title ? (
                    <View
                      style={{
                        height: wp(1),
                        width: wp(20),
                        //borderWidth: 1,
                        marginTop: wp(1),
                        backgroundColor: 'black',
                      }}></View>
                  ) : null}
                </View>
              );
            }}
          />
          <View style={styles.specification}>
            <TouchableOpacity
              onPress={() => setShow(!show)}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                height: hp(4),
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: wp(4)}}>
                Specification
              </Text>
              <Entypo name="chevron-down" style={{fontSize: wp(6)}} />
            </TouchableOpacity>
            {show ? (
              <View style={{}}>
                <HTMLView value={items.descriptionHtml} />
              </View>
            ) : null}
          </View>
          <View
            style={{
              //top: wp(45),
              // flexDirection: 'row',
              //justifyContent: 'space-between',
              paddingHorizontal: wp(9),
              width: '100%',
            }}>
            <TouchableOpacity
              style={styles.btn3}
              onPress={async() => {
               const token= await AsyncStorage.getItem('Token')
                if (token != null || token != undefined) {
                  cartOperation();
                } else {
                  createThreeButtonAlert();
                }
              }}>
              <Text
                style={{fontSize: wp(5), fontWeight: '500', color: 'white'}}>
                Add to Card
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async() => {
                const token= await AsyncStorage.getItem('Token')
                if (token != null || token != undefined) {
                  createCheckout();
                } else {
                  createThreeButtonAlert();
                }
              }}
              style={[
                styles.btn3,
                {marginTop: wp(3), backgroundColor: 'black'},
              ]}>
              <Text
                style={{fontSize: wp(5), fontWeight: '500', color: 'white'}}>
                Buy It Now
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingVertical: wp(2),
              marginVertical: wp(4),
              width: '75%',
              alignItems: 'center',
              borderWidth: 1,
              alignSelf: 'center',
              borderColor: 'lightgrey',
            }}>
            <Text style={{fontSize: wp(4), fontWeight: '500'}}>
              Costumer Reviews
            </Text>
            <Text style={{}}>No Reviews yet</Text>
            <View
              style={{
                width: '100%',
                borderTopWidth: 1,
                borderTopColor: 'lightgrey',
                marginVertical: wp(3),
                alignItems: 'center',
                paddingVertical: wp(2),
              }}>
              <Text style={{fontSize: wp(4), fontWeight: '500'}}>
                Write a review
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '50%',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: wp(13),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Fontisto name="facebook" size={wp(3)} color={'grey'} />
              <Text
                style={{fontWeight: '300', fontSize: wp(3.5), color: 'grey'}}>
                Share
              </Text>
            </View>
            <View
              style={{
                width: wp(15),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Fontisto name="twitter" size={wp(3)} color={'grey'} />
              <Text
                style={{fontWeight: '300', fontSize: wp(3.5), color: 'grey'}}>
                Tweet
              </Text>
            </View>
            <View
              style={{
                width: wp(12),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Fontisto name="pinterest" size={wp(3)} color={'grey'} />
              <Text
                style={{fontWeight: '300', fontSize: wp(3.5), color: 'grey'}}>
                Pin it
              </Text>
            </View>
          </View>
          <View style={{width: '100%', marginVertical: wp(4)}}>
            <Text
              style={{
                marginLeft: wp(5),
                marginTop: wp(3),
                fontSize: wp(4),
                fontWeight: 'bold',
              }}>
              You May Also Like
            </Text>
            <FlatList
              data={Products.slice(0, 4)}
              horizontal={true}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => {
                if (item.title != items.title) {
                  return (
                    <View style={styles.cardView}>
                      {/* <AntDesign name="hearto" style={styles.icon} /> */}
                      <TouchableOpacity
                        onPress={() => fetDetails(item.id)}
                        style={styles.imgcontainer}>
                        <Image
                          style={styles.img}
                          source={{uri: item.images[0].src}}
                        />
                      </TouchableOpacity>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={[styles.title, {marginVertical: wp(0)}]}>
                        {item?.variants[0]?.price.amount +
                          ' ' +
                          item?.variants[0]?.price.currencyCode}
                      </Text>
                    </View>
                  );
                } else {
                  return null;
                }
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default Details;
