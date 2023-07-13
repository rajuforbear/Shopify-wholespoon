import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: hp(7),
    backgroundColor: '#e6f0f2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    // shadowColor: 'black',
    // shadowOffset: {width: -2, height: 4},
    // shadowOpacity: 1,
    // shadowRadius: 3,
    // elevation: 2,
  },
  txt: {
    fontSize: wp(4),
    color: 'grey',
  },
  listCard: {
    height: hp(20),
    backgroundColor: 'white',
    marginVertical: wp(1),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
  img: {
    height: hp(12),
    width: hp(8),
  },
});
