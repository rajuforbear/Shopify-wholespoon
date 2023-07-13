import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const DropDown = ({...props}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const sendValue = (value:string) => {
    props.manageOption(value);
  };
  type values={
    value:string
  }

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown]}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={props.data}
        maxHeight={150}
        labelField={'value'}
         accessibilityLabel={'#000'}
         valueField={'value'}
  
        value={value}
        onFocus={() => setIsFocus(true)}
        placeholder={props.label}
        onBlur={() => setIsFocus(false)}
        onChange={(item:values) => {
          sendValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    flex: 1,
  },
  dropdown: {
    height: '100%',
    width: '100%',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    alignSelf: 'center',
    marginLeft: 56,
  },

  selectedTextStyle: {
    fontSize: 18,
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
