import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import Eye from 'react-native-vector-icons/MaterialCommunityIcons';
const Input = ({
  iconName,
  lable,
  error,
  onFocus = () => {},
  password,
  ...Propes
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secureText, setSecureText] = useState(true);
  return (
    <View style={{}}>
      <View
        style={[
          {
            height: hp('6%'),
            marginBottom: hp('2%'),
            marginHorizontal: wp('5%'),
            backgroundColor: null,
            //   flexDirection: 'row',
            borderRadius: hp('.5%'),
            //flexDirection: 'row',
            borderWidth: error ? wp(0.3) : wp(0.2),
            borderColor: isFocused ? '#a26a39' : error ? 'red' : '#c1c0c2',
            elevation: 1,
          },
        ]}>
        {lable ? (
          <Text
            style={{
              fontSize: wp(3.5),
              color: 'grey',
              marginLeft: wp('4%'),
              fontWeight: '600',
              marginTop: wp(1),
            }}>
            {lable}
          </Text>
        ) : null}
        <View style={{flexDirection: 'row', width: '100%'}}>
          {!iconName && (
            <Icon
              style={{
                fontSize: hp('3.5%'),
                color: '#a26a39',
                alignSelf: 'center',
                marginLeft: '2.5%',
                fontStyle: 'italic',
              }}
              name={iconName}
            />
          )}

          <TextInput
            style={{
              flex: 1,
              fontSize: wp('4%'),
              fontWeight: '400',
              paddingHorizontal: wp('4%'),
              fontStyle: 'italic',
              fontWeight: '600',
              //  color: '#a26a39',
              // marginRight: wp(2),
            }}
            placeholderTextColor={'#a26a39'}
            {...Propes}
            placeholder={null}
            onFocus={() => {
              onFocus();
              setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
            secureTextEntry={password && secureText}
          />
          {password ? (
            <Eye
              onPress={() => {
                setSecureText(!secureText);
              }}
              name={secureText ? 'eye-outline' : 'eye-off-outline'}
              style={{
                alignSelf: 'center',
                marginRight: wp(5.6),
                fontSize: wp(6.8),
                color: '#a26a39',
                position: 'absolute',
                right: 0,
                top: wp(-2),
              }}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default Input;
