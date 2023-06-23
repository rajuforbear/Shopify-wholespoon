import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
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
  onFocus = () => { },
  password,
  ...Propes
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secureText, setSecureText] = useState(true);
  return (

    <View
      style=
      {{
        height: wp(12.8),
        marginBottom: hp('2%'),
        marginHorizontal: wp('5%'),
        backgroundColor: null,
        borderWidth: error ? 1 : 1,
        borderColor: isFocused ? '#a26a39' : error ? 'red' : '#c1c0c2',
        borderRadius: wp(1.5),
        justifyContentZ: 'center'
      }
      }>
      {error ? (
        <Text
          style={{
            position: 'absolute',
            fontSize: wp(3),
            color: 'red',
            marginLeft: wp('4%'),
            fontWeight: '600',
            top: 1
          }}>
          {error}
        </Text>
      ) : lable? <Text
      style={{
        position: 'absolute',
        fontSize: wp(3),
        color: 'grey',
        marginLeft: wp('4%'),
        fontWeight: '600',
        top: 1
      }}>
      {lable}
    </Text>:null}
      <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* {!iconName && (
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
          )} */}

        <TextInput
          style={{
            flex: 1,
            fontSize: wp('4.4%'),
            fontWeight: '400',
            paddingHorizontal: wp('4%'),
            fontStyle: 'italic',
            fontWeight: '500',
            height:wp(15)


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
           
              marginRight: wp(5.6),
              fontSize: wp(6.8),
              color: '#a26a39',
              position: 'absolute',
              right: 0,
              top: wp(2.5),
            }}
          />
        ) : null}
      </View>
    </View>

  );
};

export default Input;
