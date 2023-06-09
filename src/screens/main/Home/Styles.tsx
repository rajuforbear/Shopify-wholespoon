import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default StyleSheet.create({
  conatainer: {
    flex: 1,
    //marginTop: wp(5),
    //#0f3a8d
  },

  headerContainer: {
    marginTop: '3%',
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profilePick: {
    backgroundColor: 'white',
    height: hp('6%'),
    width: hp('6%'),
    borderRadius: hp('6%'),
    overflow: 'hidden',
  },
  icon: {
    fontSize: hp('5%'),
    color: '#0f3a8d',
    alignSelf: 'center',
  },
  input: {
    height: hp('7.5%'),
    marginBottom: hp('2%'),
    marginHorizontal: wp('5%'),
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: hp('.5%'),
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    elevation: 1,
    marginTop: '2%',
  },
  picker: {
    width: '17%',
    backgroundColor: '#0f3a8d',
    borderRadius: hp('.50%'),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: '.50%',
  },
  photos: {
    height: hp('30%'),
    width: wp('100%'),
    alignItems: 'center',
    //justifyContent: 'center',
    // backgroundColor: '#e6f0f2',

    //borderWidth:1
  },
  con: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '95%',
    // borderWidth: 1,
    height: '70%',
    justifyContent: 'space-between',
  },
  viewcontainer: {
    backgroundColor: '#333',
    height: hp('10%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // borderWidth:1
  },
  cicle: {
    height: hp('5%'),
    width: hp('5%'),
    borderRadius: hp('6%'),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(13, 82, 214, 1)',
  },
  historyContainer: {
    margin: '2%',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: wp(2),
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  category: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: 'black',
    marginTop: '2%',
  },
  categoryContainer: {
    height: hp('16%'),

    width: wp('30%'),
    borderRadius: hp('.50%'),
    overflow: 'hidden',
  },
  txtContainer: {
    height: hp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(25),
  },
  titleContainer: {
    width: wp(95),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp(5),
    backgroundColor: 'white',
  },
  listCard: {
    height: hp(12),
    width: hp(12),
    //borderWidth:1,

    borderRadius: wp(3),
    backgroundColor: 'white',

    // shadowColor: '#000',
    // shadowOffset: {
    //     width: 0,
    //     height: 2,
    // },
    // shadowOpacity: 0.15,
    // shadowRadius: 2.84,
  },
  cardImage: {
    height: '100%',
    width: '100%',
    //borderRadius: wp(3),
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    color: 'black',
    // marginTop:'2%',
    fontSize: wp(3),
  },
  ViewContainer: {
    height: '85%',
    width: '58%',
    //  borderWidth:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  img2: {
    //borderWidth:1,
    height: '100%',
    width: '55%',
    alignSelf: 'center',
    marginTop: '10%',
    marginLeft: '-7%',
  },
  btn: {
    // borderWidth:1,
    height: '15%',
    width: '28%',
    marginLeft: '-45%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#0f3a8d',
  },
  cardView: {
    height: hp(28),
    backgroundColor: 'white',
    marginVertical: wp(1),
    width: wp(46),
    marginHorizontal: wp(1),
    //borderRadius: wp(2),
    // shadowColor: 'black',
    // shadowOpacity: 0.05,
  },
  imgcontainer: {
    height: wp(40),
    width: '100%',
    alignSelf: 'center',
    // marginTop: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6f0f2',
  },
  img: {
    height: '90%',
    width: '90%',
  },
  title: {
    marginTop: wp(1),
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
});
