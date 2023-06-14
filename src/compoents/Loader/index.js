import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  Platform,
  StyleSheet,
} from 'react-native';
//import colors from '../colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

//Main loader component0
export default class Loading extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size={Platform.OS == 'ios' ? 10 : 40}
          color={'green'}
        />
        <Text style={{marginTop: wp(4)}}>Loading....</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(248,249,249,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  loadingview: {
    backgroundColor: 'green',
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 10,
  },
  txt: {
    marginLeft: 10,
    marginTop: 5,
  },
});
