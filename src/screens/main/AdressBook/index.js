import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const AddressBook = ({navigation}) => {
  const userData = useSelector(state => state.data.userData);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.address}>Your Addresses</Text>
        <View style={styles.line}></View>
        <View style={{alignSelf: 'center', marginTop: wp(5)}}>
          <FlatList
            scrollEnabled={false}
            data={userData?.addresses?.nodes}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    paddingVertical: wp(3),
                    width: wp(95),
                    borderWidth: wp(0.1),
                    marginVertical: wp(1),
                    paddingLeft: wp(10),
                    borderRadius: wp(1),
                    //backgroundColor: '#787878',
                  }}>
                  <Text style={styles.adText}>{item?.firstName}</Text>
                  <Text style={styles.adText}>{item?.lastName}</Text>
                  <Text style={styles.adText}>{item?.company}</Text>
                  <Text style={styles.adText}>{item?.address1}</Text>
                  {item.address2 ? (
                    <Text style={styles.adText}>{item?.address2}</Text>
                  ) : null}

                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.adText}>{item.zip}</Text>
                    <Text style={styles.adText}>{' ' + item.city}</Text>
                    <Text style={styles.adText}>{'   ' + item.province}</Text>
                  </View>
                  <Text style={styles.adText}>{item?.country}</Text>
                  <View
                    style={{
                      width: '10%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: wp(4),

                      marginRight: wp(10),
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Address');
                      }}
                      style={styles.btn}>
                      <Text style={styles.btnText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                      <Text style={styles.btnText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddressBook;
