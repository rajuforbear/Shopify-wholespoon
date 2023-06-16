import {View, Text, Button} from 'react-native';
import React from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Innternet = ({navigation}) => {
  const betInfo = useNetInfo();
  console.log(betInfo.isConnected);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: wp(4), fontWeight: '700'}}>
        Looks like you are not connected to the internet !
      </Text>
      <Button title="Realod" onPress={() => navigation.replace('Splash')} />
    </View>
  );
};

export default Innternet;
