import React from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  StatusBar,
  Platform,
  TextInput,
} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useNavigation, StackActions } from '@react-navigation/native';
const header = () => {
  const navigation = useNavigation();
  return (
    <View style={{ width: '100%', backgroundColor: '#87CEEB' }}>
      <View style={[styles.container]}>
        <Feather
          onPress={() => navigation.openDrawer()}
          name="menu"
          style={{ fontSize: wp(9), marginLeft: '2%', color: 'white' }}
        />
        <View style={styles.search}>
          <AntDesign name="search1" size={wp(5.6)} color="grey" />
          <TextInput
            placeholder="Search...."
            style={{
              flex: 1,
              fontSize: wp(3.7),
              marginLeft: '3%',
              color: 'grey',
            }}
          />
        </View>
        <View
          style={{
            height: '72%',
            width: '11%',
            //borderWidth: 1,
            marginLeft: '6%',
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ebeded',
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.15,
            shadowRadius: 2.84,
          }}>
          <Ionicons name="bell" size={wp(6)} color="grey" />
        </View>
      </View>
    </View>
  );
};
export default header;
