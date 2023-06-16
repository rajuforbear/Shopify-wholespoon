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

const List = ({Products, navigation, handleOnReachEnd}) => {
  return (
    <View style={styles.CardContainer}>
      <FlatList
        scrollEnabled={false}
        data={Products}
        numColumns={2}
        keyExtractor={(item, index) => index}
        onEndReached={handleOnReachEnd}
        renderItem={({item, index}) => {
          return (
            <View style={styles.cardView}>
              {/* <AntDesign name="hearto" style={styles.icon} /> */}
              <TouchableOpacity
                onPress={() => navigation.navigate('Details', {item})}
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
