import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
type Props={
  name:string,
  onPress:()=>void
}
const Button:React.FC<Props> = ({name, onPress=()=>{}, ...props}) => {
  const [isFocused, setIsfocused] = useState(true);
  //console.log(isFocused);
  return (
    <TouchableOpacity
      style={{
        height: hp('6%'),
        marginVertical: hp('2%'),
        marginHorizontal: wp('3%'),
        backgroundColor: 'black',
        elevation: 5,
        flexDirection: 'row',
        borderRadius: hp('.50%'),
        justifyContent: 'center',
      }}
      activeOpacity={0.5}
      {...props}
      onFocus={() => {
        setIsfocused(true);
      }}
      onBlur={() => setIsfocused(false)}
      onPress={onPress}>
      <Text
        style={{
          fontSize: wp('4.5%'),
          fontWeight: '600',
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
