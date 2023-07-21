import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';

import React, {useEffect} from 'react';
import styles from './Styles';
import {SliderBox} from 'react-native-image-slider-box';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {useIsFocused, useNavigation} from '@react-navigation/native';

import {useDispatch, useSelector} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {url} from '../../../data/url';
import YoutubeIframe from 'react-native-youtube-iframe';
import Loading from '../../../compoents/Loader';
import {query} from './query';
import type {HelperNavigationParams} from '../../../navigation/Helper/Helper';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootState} from '../../../sopify/Redux/store';
import productquery from '../../../data/productquery';
type Props = StackScreenProps<HelperNavigationParams, 'HomeScreen'>;
const Home: React.FC<Props> = ({navigation}) => {
  const silder = [
    require('../../../assests/image1.png'),
    require('../../../assests/mobile.png'),
    require('../../../assests/watch.png'),
  ];

  const dispatch = useDispatch();
  const collection = useSelector((state: RootState) => state.data.collection);
  const isLoading = useSelector((state: RootState) => state.data.isLoading);
  const product = useSelector((state: RootState) => state.data.products);
  const HomeData = useSelector((state: RootState) => state.data.homeData);
  console.log('thois isi ', HomeData);

  const userData = useSelector((state: RootState) => state.data.userData);
  const getCollection = () => {
    // console.log('the length....', collection.length);
    console.log('this is user data...', userData);
    dispatch({
      type: 'sopify/getCollection',
    });
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    if (collection?.length <= 1) {
      getCollection();
    }
  }, []);
  useEffect(() => {
    if (product?.length <= 4) {
      dispatch({type: 'sopify/fetchAllProducts', page: 'home', length: 10});
    }
  }, []);
  useEffect(() => {
    if (true) {
      getUserData();
      FetchHome();
    }
  }, [dispatch]);
  const getUserData = async () => {
    const userToke = await AsyncStorage.getItem('Token');

    let data = JSON.stringify({
      query: `query{
        customer(customerAccessToken:${JSON.stringify(userToke)}){
        ${query}
    }`,
      variables: {},
    });
    //console.log(userToke);
    dispatch({
      type: 'sopify/userDatareq',
      data: data,
      page: 'home',
      navigation,
    });
  };
  const fetDetails = (id: string) => {
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
    });
  };
  const data = HomeData?.collections?.edges?.filter(
    item => item.node.products.edges.length > 1,
  );
  const FetchHome = () => {
    let data = JSON.stringify({
      query: `query {
      shop {
        name
        description
    
      }
      collections(first: 10) {
        edges {
          node {
            title
            id
            image{
                id
                url
    
            }
            products(first: 5) {
              edges {
                node {
                  title
                  id
                  images(first:10){
                     nodes{
                         id
                         url
                     }
                  }
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`,
      variables: {},
    });
    dispatch({
      type: 'sopify/fetchHome',
      data: data,
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {isLoading ? <Loading /> : null}
      {/* <ImageBackground
        style={{flex: 1}}
        source={require('../../../assests/bgImg.jpg')}> */}
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{paddingBottom: wp(2)}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.conatainer}>
          <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            keyExtractor={(item, index) => item.node.id}
            renderItem={({item}) => {
              if (item.node.image) {
                return (
                  <TouchableOpacity onPress={() => getUserData()}>
                    <ImageBackground
                      source={{uri: item.node?.image.url}}
                      style={styles.photos}>
                      <View style={styles.con}></View>
                    </ImageBackground>
                  </TouchableOpacity>
                );
              } else {
                return null;
              }
            }}
          />
        </View>

        <View style={{height: hp(5), width: '100%', backgroundColor: 'white'}}>
          <View style={styles.titleContainer}>
            <Text style={styles.category}>Top Categories</Text>
            <Text
              onPress={
                () => navigation.navigate('Categories')
                // dispatch({type: 'sopify/fetchAllProducts', page: 'home'})
              }
              style={[
                styles.category,
                {
                  color: '#0f3a8d',
                  fontWeight: '400',
                  textDecorationLine: 'underline',
                  fontSize: wp(4),
                },
              ]}>
              See All
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            height: hp('22%'),
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.15,
            shadowRadius: 0.84,
            elevation: 1,
            //borderWidth:1
          }}>
          <View style={{marginTop: '4%'}}>
            <FlatList
              data={data}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({item}) => {
                if (item.node.image) {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        // navigation.navigate('ProductList', {title: item.title})
                        {
                          dispatch({
                            type: 'sopify/fetchProductById',
                            prId: item.node.id,
                            navigation,
                            title: item.node.title,
                            length: 10,
                            page: 'home',
                          });
                        }
                      }
                      activeOpacity={8}
                      style={{
                        height: hp(18),
                        width: hp(15),
                        marginHorizontal: wp(1.3),
                        //borderWidth: 1,
                      }}>
                      <Image
                        style={styles.cardImage}
                        source={{uri: item?.node.image.url}}
                      />
                      <Text
                        style={{
                          color: 'black',
                          fontSize: wp(3.5),
                          fontWeight: '700',
                          textAlign: 'center',
                          fontStyle: 'italic',
                          marginTop: wp(1),
                        }}>
                        {item.node.title}
                      </Text>
                    </TouchableOpacity>
                  );
                } else {
                  return null;
                }
              }}
            />
          </View>
        </View>
        <View
          style={{
            height: hp(5),
            width: '100%',
            backgroundColor: 'white',
            marginTop: wp(5),
          }}>
          <View style={[styles.titleContainer, {height: hp(5)}]}>
            <Text
              style={[styles.category, {marginTop: '-6%', marginLeft: wp(2)}]}>
              Featured
            </Text>
            <Text
              onPress={() => {
                dispatch({
                  type: 'sopify/fetchAllProducts',
                  navigation,
                  title: 'Products',
                  id: 'home',
                  length: 10,
                });
              }}
              style={[
                styles.category,
                {
                  color: '#0f3a8d',
                  fontWeight: '400',
                  textDecorationLine: 'underline',
                  fontSize: wp(4),
                  marginTop: '-6%',
                },
              ]}>
              See All
            </Text>
          </View>
        </View>
        <View style={{width: '97%', alignSelf: 'center', paddingBottom: hp(8)}}>
          <FlatList
            data={data}
            numColumns={2}
            scrollEnabled={false}
            keyExtractor={(item, index) => item.node.id}
            renderItem={({item}) => {
              // console.log(item);

              return (
                <View style={styles.cardView}>
                  {/* <AntDesign name="hearto" style={styles.icon} /> */}
                  <TouchableOpacity
                    onPress={() =>
                      fetDetails(item.node.products.edges[0].node.id)
                    }
                    style={styles.imgcontainer}>
                    <Image
                      style={styles.img}
                      source={{
                        uri: item.node.products.edges[0]?.node.images.nodes[0]
                          .url,
                      }}
                    />
                  </TouchableOpacity>
                  <Text style={styles.title}>
                    {item?.node?.products?.edges.length > 0
                      ? item?.node?.products?.edges[1]?.node?.title
                        ? item?.node?.products?.edges[1]?.node?.title
                        : item?.node?.products?.edges[0]?.node?.title
                      : 'Thai Paste'}
                  </Text>
                  <Text style={[styles.title, {marginVertical: wp(0)}]}>
                    {item?.node?.products?.edges.length > 0
                      ? item?.node?.products?.edges[1]?.node?.priceRange
                          .minVariantPrice.amount
                      : item?.node?.products?.edges[0]?.node?.priceRange
                          .minVariantPrice.amount +
                        ' ' +
                        item?.node.products?.edges[0]?.node.priceRange
                          .minVariantPrice.currencyCode}
                  </Text>
                </View>
              );
            }}
          />
        </View>
        <View style={{paddingVertical: wp(1), marginTop: wp(-15)}}>
          <Text
            style={{fontSize: wp(4), textAlign: 'center', fontWeight: 'bold'}}>
            MAKE YOUR MEALS IN MINUTES #COOKWITHWHOLESPOON #GIFTWITHWHOLESPOON
          </Text>
        </View>

        {/* <YoutubeIframe
          height={hp(30)}
          //play={playing}
          videoId={'moTS8-17BSA'}
          // onChangeState={onStateChange}
        /> */}

        <View style={{marginTop: wp(-10)}}>
          <SliderBox
            images={url}
            resizeMode="contain"
            //sliderBoxHeight={hp(30)}
            ImageComponentStyle={{height: hp(70), width: wp(100)}}
            dotStyle={{height: 0, width: 0}}
          />
        </View>
      </ScrollView>
      {/* </ImageBackground> */}
    </View>
  );
};

export default Home;
