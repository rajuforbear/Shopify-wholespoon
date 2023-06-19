import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../../compoents/Loader';
import List from './List';
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
          page: 'raju',
        });
      } else {
        dispatch({
          type: 'sopify/fetchAllProducts',
          navigation,
          title: 'Products',
          id: 'raju',
          length: length,
        });
      }

      console.log(length);
    }
  };
  return (
    <View style={styles.container}>
      {isFetching ? <Loading /> : null}
      <ScrollView
        onTouchEnd={() => {
          handleOnReachEnd();
        }}>
        {/* <View style={styles.header}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: wp(100),
            }}>
            <Text style={styles.txt}> {title}</Text>
            <View style={{width: '25%'}}></View>
          </View>
        </View> */}
        <List Products={Products} navigation={navigation} />
      </ScrollView>
    </View>
  );
  {
    /* 0f3a8d */
  }
};
export default ProductList;
