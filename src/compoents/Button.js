import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';

const Button = ({name, onFocus, ...props}) => {
  const [isFocused, setIsfocused] = useState(true);
  //console.log(isFocused);
  return (
    <TouchableOpacity
      style={{
        height: hp('6%'),
        marginVertical: hp('2%'),
        marginHorizontal: wp('3%'),
        backgroundColor: '#A97732',
        elevation: 5,
        flexDirection: 'row',
        borderRadius: hp('.50%'),
        flexDirection: 'row',
        justifyContent: 'center',
      }}
      activeOpacity={1}
      {...props}
      onFocus={() => {
        setIsfocused(true);
      }}
      onBlur={() => setIsfocused(false)}>
      <Text
        style={{
          fontSize: hp('3%'),
          fontWeight: 'bold',
          color: 'white',
          alignSelf: 'center',
          fontStyle: 'italic',
        }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
