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
    width: wp(38),
    alignItems: 'center',
  },
  card: {
    // borderWidth:1,
    width: wp(32),
    height: hp(20),
    margin: wp(0.5),
    borderRadius: wp(3),
    backgroundColor: '#e6f0f2',
  },
  progressBarContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'green',
  },
  item: {
    // borderWidth:1,
    height: hp(6),
    paddingHorizontal: wp(5),
    //backgroundColor: '#e6f0f2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f5f4',
  },
  cardCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(42),
  },
  listContainer: {
    height: hp(25),
    backgroundColor: 'white',
    marginVertical: wp(1),
    paddingHorizontal: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgContainer: {
    height: '85%',
    width: '40%',
    marginTop: '-5%',
    //backgroundColor: '#e6f0f2',
  },
  img: {
    height: '87%',
    width: '100%',
    resizeMode: 'cover',
    // marginTop: '8%',
  },
  itemContainer: {
    // marginLeft:'5%',
    // borderWidth:1,
    width: '60%',
    height: '100%',
    marginLeft: '5%',
  },
  Qnt: {
    height: hp(3),
    width: wp(15),
    backgroundColor: 'lightgrey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '2%',
  },
  placeContainer: {
    height: hp(8),
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btn: {
    height: hp(5.5),
    width: wp(95),
    backgroundColor: '#0f3a8d',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(1),
  },
  btnText: {
    fontSize: wp(4),
    fontWeight: '500',
    color: 'white',
  },
  quantity: {
    height: hp(4),
    width: hp(4),
    alignItems: 'center',
    // borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: '#e6f0f2',
    borderRadius: wp(1),
  },
  quantityContainer: {
    flexDirection: 'row',
    height: hp(4.5),
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',

    alignSelf: 'center',
    backgroundColor: '#e6f0f2',
    borderRadius: wp(1),
    paddingHorizontal: wp(2),
    borderWidth: wp(0.1),
    marginTop: wp(1),
  },
  checkbox: {
    position: 'absolute',
    right: '2%',
    top: '4%',
    borderWidth: wp(0.5),
    height: wp(5.5),
    width: wp(6),
    borderColor: 'lightgrey',
    backgroundColor: '#f5f6f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    // borderWidth: 1,
    marginTop: wp(8),
    width: '100%',
    flexDirection: 'row',
  },
  delebtn: {
    backgroundColor: '#ededed',
    height: wp(8),
    width: wp(15),
    borderRadius: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: wp(0.1),
  },
});
