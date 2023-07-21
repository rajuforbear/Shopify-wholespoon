import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    fontStyle:"italic"
  },
  cardView: {
    height: hp(28),
    backgroundColor: 'white',
    marginVertical: wp(1),
    width: wp(46),
    marginHorizontal: wp(1),
  },
  CardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: wp(1),
  },
  imgcontainer: {
    height: wp(40),
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6f0f2',
  },
  img: {
    height: '90%',
    width: '90%',
  },
  txt2: {
    alignSelf: 'center',
    marginTop: wp(2),
    fontSize: wp(4),
    fontWeight: '500',
    color: 'black',
    fontStyle:"italic"
  },
  btn: {
    borderRadius: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    width: wp(22),
    height: hp(3.5),
    borderColor: 'grey',
    alignSelf: 'center',
    marginTop: wp(2),
    backgroundColor: '#0f3a8d',
  },
  priceCOntainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '89%',
    //justifyContent:'space-between',
    marginTop: wp(1),
    alignSelf: 'center',
  },
  Price: {
    fontSize: wp(4),
    alignSelf: 'center',
    fontWeight: '500',
    color: 'black',
    fontStyle:"italic"
  },
  icon: {
    fontSize: wp(5),
    position: 'absolute',
    right: wp(3),
    top: wp(2),
    fontStyle:'italic'
  },
  title: {
    marginTop: wp(1),
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'black',
    fontStyle:'italic'
  },
});
