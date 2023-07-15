import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';
import { product ,Products} from '../../../Types/product';
import { RootNavigationParams } from '../../../Types/NavigationProps';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HelperNavigationParams } from '../../../navigation/Helper';
import productquery from '../../../data/productquery';
import { useDispatch } from 'react-redux';
type Props={
  Products:Products,
 
}
const List:React.FC<Props> = ({Products}) => {
  const dispatch=useDispatch()
  const fetDetails = (id:string) => {
    const axios = require('axios');
    let data = JSON.stringify({
      query: `query getProductById($id: ID!) {
  product(id: $id) 
  {
    ${productquery}
  }
}`,
      variables: {id:id},
    });
    dispatch({
      type: 'sopify/ProductDetails',
      data: data,
      navigation,
    });
  };
  const navigation:StackNavigationProp<HelperNavigationParams>=useNavigation()
  return (
    <View style={styles.CardContainer}>
      <FlatList
        scrollEnabled={false}
        data={Products}
        numColumns={2}
        keyExtractor={(item, index) =>item.id}
        renderItem={({item, index}) => {
          return (
            <View style={styles.cardView}>
              {/* <AntDesign name="hearto" style={styles.icon} /> */}
              <TouchableOpacity
                onPress={() => fetDetails(item.id)}
                style={styles.imgcontainer}>
                <Image style={styles.img} source={{uri: item.images[0].src}} />
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
  );
};

export default List;
