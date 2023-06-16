import React from 'react';
import {Text, View, TextInput} from 'react-native';
import styles from './styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';

const Input = ({lable, notlable, lable2, notInput, ...props}) => {
  return (
    <View
      style={[
        styles.inputfield,
        notInput && {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: wp(4),
        },
      ]}>
      {!notlable && (
        <View style={styles.lable}>
          <Text
            style={{
              fontSize: wp(3),
              position: 'relative',
            }}>
            {lable}
          </Text>
        </View>
      )}
      {!notInput ? (
        <TextInput style={{fontSize: wp(4), flex: 1}} {...props} />
      ) : (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: wp(4)}}>Country</Text>
          <Entypo name="chevron-down" size={wp(6)} />
        </View>
      )}
    </View>
  );
};
export default Input;
