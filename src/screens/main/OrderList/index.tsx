import {View, Text, FlatList, Image} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../sopify/Redux/store';
import styles from './styles';

const OrderList = () => {
  const orders = useSelector(
    (state: RootState) => state.data.userData.orders.edges,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Your Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item, index) => item.node.id}
        renderItem={({item, index}) => (
          <View style={styles.listCard}>
            <Image
              style={styles.img}
              source={{uri: item.node.lineItems.nodes[0].variant.image.url}}
            />
            <View>
              <Text style={styles.txt2}>
                {item.node.lineItems.nodes[0].title.substring(0, 24) + '...'}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default OrderList;
