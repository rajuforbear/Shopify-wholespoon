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
import Cat from '../../../data/Cat';
import Card from '../../../compoents/Card';
import {Products} from '../../../data/Products';
import Header from '../../../compoents/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import BottumTab from '../../../compoents/BottumTab';
import {TouchableWithoutFeedback} from 'react-native';
import Anty from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import Shopify from '../../../sopify/API/Shopify';
import {getUserData} from '../../../sopify/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = () => {
  const navigation = useNavigation();
  const silder = [
    require('../../../assests/image1.png'),
    require('../../../assests/mobile.png'),
    require('../../../assests/watch.png'),
  ];

  const dele = item => {};
  const dispatch = useDispatch();
  const collection = useSelector(state => state.data.collection);
  const product = useSelector(state => state.data.products);
  const userData = useSelector(state => state.data.userData);
  const getCollection = () => {
    // console.log('the length....', collection.length);
    console.log('this is user data...', userData);
    dispatch({
      type: 'sopify/getCollection',
    });
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    if (collection.length <= 1) {
      getCollection();
    }
  }, []);
  useEffect(() => {
    if (product.length <= 4) {
      dispatch({type: 'sopify/fetchAllProducts', page: 'home'});
    }
  }, []);
  useEffect(() => {
    if (userData === null || userData === undefined) {
      getUserData();
    }
  }, [dispatch]);
  const getUserData = async () => {
    const userToke = await AsyncStorage.getItem('Token');
    let data = JSON.stringify({
      query: `query {
    customer(customerAccessToken:${JSON.stringify(userToke)}) {
      id
      firstName
      lastName
      acceptsMarketing
      email
      phone
    }
  }`,
      variables: {},
    });
    //console.log(userToke);
    dispatch({
      type: 'sopify/userDatareq',
      data: data,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header />
      {/* <ImageBackground
        style={{flex: 1}}
        source={require('../../../assests/bgImg.jpg')}> */}
      <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
        <View style={styles.conatainer}>
          <FlatList
            data={collection}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            keyExtractor={(item, index) => index}
            renderItem={({item}) => {
              if (item.image) {
                return (
                  <TouchableOpacity onPress={() => Shopify.test()}>
                    <ImageBackground
                      source={{uri: item.image?.src}}
                      style={styles.photos}>
                      <View style={styles.con}>
                        <View style={styles.ViewContainer}>
                          <Text
                            style={{
                              alignSelf: 'flex-start',
                              fontSize: 15,
                              color: '#3f62e0',
                              fontWeight: '500',
                              color: 'white',
                            }}>
                            special offer
                          </Text>
                          <Text
                            style={{
                              fontSize: wp(10),
                              fontWeight: 'bold',
                              textAlign: 'center',
                              color: 'black',
                              color: 'pink',
                            }}>
                            Sale Up To 70% Off
                          </Text>
                        </View>
                        <View style={styles.img2}></View>
                      </View>
                      {/* <TouchableOpacity style={styles.btn}>
                      <Text style={{color: 'white'}}>{'Shop Now ->'}</Text>
                    </TouchableOpacity> */}
                    </ImageBackground>
                  </TouchableOpacity>
                );
              }
            }}
          />
        </View>
        {/* <View style={styles.viewcontainer}>
          <View style={styles.historyContainer}>
            <View style={styles.cicle}>
              <Icon3 name='bag' color='rgba(233, 102, 49, 1)' size={hp('2%')} />
            </View>
            <View style={styles.txtContainer}>
              <Text style={styles.txt}>Since 1987</Text>
            </View>
          </View>
 <View style={styles.historyContainer}>
            <View style={[styles.cicle]}>
              <Icon4 name='window-restore' color='rgba(233, 102, 49, 1)' size={hp('2%')} />
            </View>
            <View style={styles.txtContainer}>
              <Text style={styles.txt}>16+ Exclusive Store</Text>
            </View>
          </View>
          <View style={styles.historyContainer}>
            <View style={[styles.cicle,]}>
              <Icon6 name='shield-lock' color='rgba(233, 102, 49, 1)' size={hp('2%')} />
            </View>
            <View style={styles.txtContainer}>
              <Text style={styles.txt}>Secure Shopping</Text>
            </View>
          </View>
          <View style={styles.historyContainer}>
            <View style={[styles.cicle]}>
              <Icon7 name='users' color='rgba(233, 102, 49, 1)' size={hp('2%')} />
            </View>
            <View style={styles.txtContainer}>
              <Text style={styles.txt}> 10 Lac+ const..</Text>
            </View>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.category}>Top Categories</Text>
          <Text style={[styles.category, { color: '#0f3a8d',fontWeight:'400', textDecorationLine: 'underline' }]}>See All</Text> 
        </View> */}
        <View style={{height: hp(5), width: '100%', backgroundColor: 'white'}}>
          <View style={styles.titleContainer}>
            <Text style={styles.category}>Top Categories</Text>
            <Text
              onPress={() => navigation.navigate('Categories')}
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
                      onPress={() => navigation.navigate('ProductList')}
                      activeOpacity={8}
                      style={{
                        height: hp(15),
                        width: hp(15),
                        marginHorizontal: wp(1.3),
                        // borderWidth: 1,
                      }}>
                      {item.image ? (
                        <Image
                          style={styles.cardImage}
                          source={{uri: item?.image.src}}
                        />
                      ) : null}
                    </TouchableOpacity>
                  );
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
                dispatch({type: 'sopify/fetchAllProducts', navigation});
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
            keyExtractor={(item, index) => index}
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
      </ScrollView>
      {/* </ImageBackground> */}

      <BottumTab />
    </View>
  );
};

export default Home;
