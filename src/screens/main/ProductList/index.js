import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../../compoents/Loader';
//import { Products } from '../../../data/Products';
const ProductList = props => {
  const dispatch = useDispatch();
  const {title} = props.route.params;
  const navigation = useNavigation();
  const Products = useSelector(state => state.data.products);
  const id = useSelector(state => state.data.id);
  console.log('this is id', id);
  console.log('products....', Products.length);
  const isFetching = useSelector(state => state.data.isLoading);
  const handleOnReachEnd = () => {
    if (Products.length >= 9) {
      let length = Products.length + 10;
      if (id != 'home') {
        dispatch({
          type: 'sopify/fetchProductById',
          prId: id,
          navigation,
          title: title,
          length: length,
        });
      } else {
        dispatch({
          type: 'sopify/fetchAllProducts',
          navigation,
          title: 'Products',
          id: 'home',
          length: length,
        });
      }

      console.log(length);
    }
  };
  return (
    <View style={styles.container}>
      {isFetching ? <Loading /> : null}
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            //  borderWidth: 1,
            width: wp(100),
            marginLeft: wp(2),
          }}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={wp(6)}
            color="black"
          />
          <Text style={styles.txt}> {title}</Text>
          <View style={{width: '25%'}}></View>
        </View>
      </View>
      <View style={styles.CardContainer}>
        <FlatList
          data={Products}
          numColumns={2}
          keyExtractor={(item, index) => index}
          onEndReached={() => handleOnReachEnd()}
          renderItem={({item, index}) => {
            return (
              <View style={styles.cardView}>
                {/* <AntDesign name="hearto" style={styles.icon} /> */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('Details', {item})}
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
    </View>
  );
  {
    /* 0f3a8d */
  }
};
export default ProductList;
