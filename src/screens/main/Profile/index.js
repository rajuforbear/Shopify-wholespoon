import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import styles from './styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Profile = () => {
  const userData = useSelector(state => state.data.userData);
  console.log(userData);
  return (
    <View style={{flex: 1, backgroundColor: '#e6f0f2'}}>
      <ScrollView>
        <Text style={styles.title}>
          {userData?.firstName + ' ' + userData?.lastName}
        </Text>
        <Text style={{alignSelf: 'center', color: '#A36B25'}}>
          {userData?.email}
        </Text>
        <View style={styles.line}></View>
        <View style={{flex: 1, marginTop: wp(3)}}>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: wp(3),
              width: '100%',
              borderWidth: wp(0.1),
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: wp(8),
            }}>
            <View>
              <Text
                style={{
                  fontSize: wp(5),

                  //  marginTop: wp(4),
                  fontStyle: 'normal',
                  fontWeight: '600',
                }}>
                Oder History
              </Text>
              <Text style={{marginTop: wp(1)}}>No orders yet</Text>
            </View>
            <AntDesign name="right" size={wp(5)} color="black" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: wp(3),
              width: '100%',
              borderWidth: wp(0.1),
              borderTopWidth: 0,
              justifyContent: 'space-between',
              paddingHorizontal: wp(8),
              alignItems: 'center',
            }}>
            <View>
              <Text
                style={{
                  fontSize: wp(5),

                  //  marginTop: wp(4),
                  fontStyle: 'normal',
                  fontWeight: '600',
                }}>
                Saved Addresses
              </Text>
              <Text style={{marginTop: wp(1)}}>No Saved Address</Text>
            </View>
            <AntDesign name="right" size={wp(5)} color="black" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
