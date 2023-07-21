import {View, Text, ScrollView,TouchableOpacity} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import styles from './styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Pencil from 'react-native-vector-icons/FontAwesome5';
import {RootState} from '../../../sopify/Redux/store';
import {StackScreenProps} from '@react-navigation/stack';
import {HelperNavigationParams} from '../../../navigation/Helper/Helper';
import {NavigationParams} from '../../../navigation';
import {CompositeScreenProps} from '@react-navigation/native';
type Props = CompositeScreenProps<
  StackScreenProps<HelperNavigationParams, 'Profile'>,
  StackScreenProps<NavigationParams, 'Register'>
>;
const Profile: React.FC<Props> = ({navigation}) => {
  
  
  const userData = useSelector((state: RootState) => state.data.userData);
  console.log(userData?.addresses?.nodes?.length);
  const handleAddress = () => {
    navigation.navigate('AddressBook');
  };
  return (
    <View style={{flex: 1, backgroundColor: '#e6f0f2'}}>
      <ScrollView>
        <Text style={[styles.title, {marginLeft: wp(14)}]}>
          {userData?.firstName + ' ' + userData?.lastName}
          {'        '}
          <Pencil
            onPress={() => {
              navigation.navigate('Register', {page: 'update'});
            }}
            name="edit"
            size={wp(4)}
          />{' '}
        </Text>
        <Text style={{alignSelf: 'center', color: '#A36B25'}}>
          {userData?.email}
        </Text>
        <View style={styles.line}></View>
        <View style={{flex: 1, marginTop: wp(3)}}>
          <TouchableOpacity
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
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleAddress();
            }}
            style={[
              styles.list,
              userData?.addresses?.nodes?.length > 0
                ? {paddingVertical: wp(4.8)}
                : null,
            ]}>
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
              {userData?.addresses?.nodes?.length === 0 ? (
                <Text style={{marginTop: wp(1)}}>No Saved Address</Text>
              ) : null}
            </View>
            <View style={styles.circle}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                {userData?.addresses?.nodes?.length}
              </Text>
            </View>
            <AntDesign
            
              name="right"
              size={wp(5)}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
