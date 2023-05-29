import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f5f4',
  },
  header: {
    height: hp(7),
    backgroundColor: '#e6f0f2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },
  txt: {
    fontSize: wp(4),
    color: 'grey',
  },
  contact: {
    height: hp(5),
    width: '100%',
    backgroundColor: 'lightgrey', //'#f2f5f4',
  },
  cont: {
    position: 'absolute',
    bottom: 5,
    fontSize: wp(4),
    left: wp(3),
    fontWeight: '500',
    color: 'black',
  },
  inputfield: {
    height: hp(6.2),
    marginHorizontal: wp(3),
    borderWidth: 1,
    marginVertical: wp(3),
    borderRadius: wp(1),
    borderColor: 'grey',
    paddingHorizontal: wp(3),
  },
  lable: {
    paddingHorizontal: wp(2),
    position: 'absolute',
    top: wp(-2),
    left: wp(4),
    // backgroundColor: '#e6f0f2',
    marginHorizontal: wp(2),
    //borderWidth: 1,
    height: hp(2.5),
    backgroundColor: '#f2f5f4',
  },
  btn: {
    height: hp(3.8),
    width: wp(18),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(4),
    marginLeft: wp(5),
  },
  btn2: {
    height: hp(5),
    marginHorizontal: wp(3),
    backgroundColor: '#0f3a8d',
    borderRadius: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
