import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
//import { Products } from '../../../data/Products';
const ProductList = () => {
  const navigation = useNavigation();
  const Products = useSelector(state => state.data.products);
  //console.log('products....', Products);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={wp(5)}
            color="grey"
          />
          <Text style={styles.txt}> Productlist</Text>
        </View>
      </View>
      <View style={styles.CardContainer}>
        <FlatList
          data={Products}
          numColumns={2}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => {
            if (index == 1) {
              //console.log(JSON.stringify(item.variants[0].price.amount));
            }
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
