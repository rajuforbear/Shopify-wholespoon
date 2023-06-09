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
import type {HelperNavigationParams} from '../../../navigation/Helper';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootState} from '../../../sopify/Redux/store';
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
  // console.log(product);
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
            data={collection}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => {
              if (item.image) {
                return (
                  <TouchableOpacity onPress={() => getUserData()}>
                    <ImageBackground
                      source={{uri: item.image?.src}}
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
            height: hp('16%'),
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
              data={collection}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({item}) => {
                if (item.image) {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        // navigation.navigate('ProductList', {title: item.title})
                        {
                          dispatch({
                            type: 'sopify/fetchProductById',
                            prId: item.id,
                            navigation,
                            title: item.title,
                            length: 10,
                            page: 'home',
                          });
                        }
                      }
                      activeOpacity={8}
                      style={{
                        height: hp(15),
                        width: hp(15),
                        marginHorizontal: wp(1.3),
                        // borderWidth: 1,
                      }}>
                      {item.image ? (
                        <ImageBackground
                          style={styles.cardImage}
                          source={{uri: item?.image.src}}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: wp(4),
                              fontWeight: '700',
                            }}>
                            {item.title}
                          </Text>
                        </ImageBackground>
                      ) : null}
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
            data={product.slice(0, 6)}
            numColumns={2}
            scrollEnabled={false}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => {
              // console.log(item);
              return (
                <View style={styles.cardView}>
                  {/* <AntDesign name="hearto" style={styles.icon} /> */}
                  <TouchableOpacity
                    onPress={
                      () => navigation.navigate('Details', {item})
                      //getUserData()
                    }
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
