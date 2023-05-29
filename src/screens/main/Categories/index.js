import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottumTab from '../../../compoents/BottumTab';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import Cat from '../../../data/Cat';
import Shopify from '../../../sopify/API/Shopify';
import {useDispatch, useSelector} from 'react-redux';
import {getCollection} from '../../../sopify/Redux/Slice';
import Loader from '../../../compoents/Loader';

const Categories = ({navigation}) => {
  const data = useSelector(state => state.data.collection);
  const isLoading = useSelector(state => state.data.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data.length <= 0) getData();
  }, [dispatch]);

  const getData = () => {
    //console.log('the length....', data.length);
    dispatch({
      type: 'sopify/getCollection',
    });
  };

  const fetchProductById = id => {
    dispatch({
      type: 'sopify/fetchProductById',
      prId: id,
      navigation,
    });
  };
  // console.log('this is g=home ........................', JSON.stringify(data));
  return (
    <View style={{flex: 1}}>
      {isLoading ? <Loader /> : null}
      <View style={styles.header}>
        <View style={styles.back}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={wp(5.9)}
            color="grey"
          />
          <Text style={{fontSize: wp(4.5), color: 'grey'}}>Categories</Text>
        </View>
        <View style={[styles.back, {width: wp(20)}]}>
          <AntDesign name="hearto" style={{fontSize: wp(6), color: 'grey'}} />
          <Feather name="shopping-bag" size={wp(6)} color="grey" />
        </View>
      </View>
      <View
        style={{
          flex: 1,

          width: wp(100),
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => {
            if (index == 3) {
              console.log(item.id);
            }
            return (
              <TouchableOpacity
                onPress={() => fetchProductById(item.id)}
                style={styles.card}>
                {/* <Text
                  style={{
                    marginLeft: wp(3),
                    marginVertical: hp(1),
                    fontSize: wp(4),
                    fontWeight: 'bold',
                  }}>
                  {item.name}
                </Text> */}
                <ImageBackground
                  style={{
                    height: '100%',
                    width: '100%',
                    alignSelf: 'center',
                    //resizeMode: 'contain',
                    borderRadius: wp(0),
                    justifyContent: 'center',
                  }}
                  source={
                    item?.image
                      ? {uri: item?.image?.src}
                      : require('../../../assests/noimg.jpeg')
                  }>
                  <Text
                    style={{
                      alignSelf: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: wp(6),
                    }}>
                    {item.title}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};
export default Categories;
