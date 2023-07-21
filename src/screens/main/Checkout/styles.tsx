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
    fontSize: wp(5),
    color: 'black',
    fontWeight: '700',
    fontStyle:'italic'
  },
  contact: {
    height: hp(5),
    width: '100%',
    backgroundColor: '#F6F6F6', //'#f2f5f4',
    
  },
  cont: {
    position: 'absolute',
    bottom: 5,
    fontSize: wp(5),
    left: wp(3),
    fontWeight: '700',
    color: 'black',
    fontStyle:"italic"
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
  inputfield2: {
    height: hp(6.2),
    marginHorizontal: wp(3),
    borderWidth: 1,
    marginVertical: wp(3),
    borderRadius: wp(1),
    borderColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
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
    backgroundColor: 'black',
    borderRadius: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp(8),
  },
  mainList: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  listContainer: {
    height: wp(17),
    width: wp(17),
    marginTop: wp(1),
  },
  listCircle: {
    position: 'absolute',
    height: wp(6),
    width: wp(6),
    borderRadius: wp(4),
    backgroundColor: '#7E7D79',
    right: wp(-3),
    top: wp(-3),
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quality: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp(4),
    fontStyle:'italic'
  },
  listImage: {
    height: wp(16),
    width: wp(16),
    borderRadius: wp(2),
    overflow: 'hidden',
  },
});
