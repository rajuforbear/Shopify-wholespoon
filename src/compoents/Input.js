import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
const Input = ({iconName, lable, ...Propes}) => {
  return (
    <View style={{}}>
      {lable && (
        <Text
          style={{
            fontSize: 18,
            color: 'grey',
            marginLeft: wp('5%'),
            marginVertical: wp('2%'),
          }}>
          {lable}
        </Text>
      )}
      <View
        style={[
          {
            height: hp('6%'),
            marginBottom: hp('2%'),
            marginHorizontal: wp('5%'),
            backgroundColor: 'white',
            flexDirection: 'row',
            borderRadius: hp('.5%'),
            flexDirection: 'row',
            borderWidth: 1.5,
            borderColor: 'grey',
            elevation: 1,
          },
        ]}>
        {iconName && (
          <Icon
            style={{
              fontSize: hp('3.5%'),
              color: 'grey',
              alignSelf: 'center',
              marginLeft: '2.5%',
            }}
            name={iconName}
          />
        )}

        <TextInput
          style={{
            flex: 1,
            fontSize: hp('2.5%'),
            fontWeight: '400',
            paddingHorizontal: wp('4%'),
          }}
          placeholderTextColor={'grey'}
          {...Propes}
        />
      </View>
    </View>
  );
};

export default Input;
