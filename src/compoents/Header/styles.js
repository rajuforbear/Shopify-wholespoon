import {Platform, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  container: {
    height: hp(7),
    width: '100%',
    alignItems: 'center',

    flexDirection: 'row',
    elevation: 5,
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
  },
  search: {
    // borderWidth:1,
    height: '72%',
    width: '65%',
    borderRadius: wp(5),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '4%',
    elevation: 5,
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    marginLeft: '4%',
  },
});
