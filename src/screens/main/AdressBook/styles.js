import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0f2',
  },
  address: {
    alignSelf: 'center',
    marginTop: wp(4),
    fontSize: wp(5),
    fontWeight: '600',
    color: 'black',
    fontStyle: 'italic',
  },
  line: {
    borderWidth: wp(0.4),
    width: wp(45),
    borderRadius: wp(1),
    alignSelf: 'center',
    marginTop: wp(1),
    borderColor: 'black',
  },
  adText: {
    // alignSelf: 'center',
    fontSize: wp(4),
    fontWeight: '500',
    color: 'black',
    marginVertical: wp(0.5),
    textAlign: 'left',
    fontStyle: 'italic',
  },
  btn: {
    height: hp(4),
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(30),
    // borderRadius: wp(1),
    // backgroundColor: '#abdbe3',
  },
  btnText: {
    color: '#D9C5AA',
    fontSize: wp(4),
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
});
