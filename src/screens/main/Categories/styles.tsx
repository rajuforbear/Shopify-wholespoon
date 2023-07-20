import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  header: {
    height: hp(6),
    backgroundColor: '#e6f0f2',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    flexDirection: 'row',
  },
  back: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth:1,
    width: wp(55),
    alignItems: 'center',
  },
  card: {
    // borderWidth: 1,
    width: wp(47),
    height: hp(28),
    marginHorizontal: wp(1),
    borderRadius: wp(0),
    backgroundColor: '#e6f0f2',
    overflow: 'hidden',
    marginVertical: wp(2),
  },
});
