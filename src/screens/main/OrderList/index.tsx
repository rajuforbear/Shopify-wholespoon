import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../sopify/Redux/store';
import styles from './styles';

const OrderList = () => {
  const Orderlist = useSelector(
    (state: RootState) => state.data.userData.orders,
  );
  console.log(JSON.stringify(Orderlist));
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Your Orders</Text>
      <FlatList
        data={Orderlist.edges}
        keyExtractor={(item, index) => item.node.id}
        renderItem={({item, index}) => (
          <View style={{borderWidth: 0.4}}>
            <Text style={{fontSize: 10}}>{item.node.customerUrl}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default OrderList;
