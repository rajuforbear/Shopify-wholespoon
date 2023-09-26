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
  },
  txt: {
    alignSelf: 'center',
    marginTop: 5,
    fontSize: wp(4),
    fontWeight: '800',
    color: 'black',
  },
  listCard: {
    height: hp(20),
    backgroundColor: 'white',
    marginVertical: wp(1),
    flexDirection: 'row',
    paddingHorizontal: wp(4),
  },
  img: {
    height: '100%',
    width: wp(25),
  },
  txt2: {
    marginTop: hp(2),
    fontSize: wp(5),
    fontWeight: '600',
    color: 'black',
    marginLeft: wp(10),
  },
  txt3: {
    position: 'absolute',
    right: 15,
    top: 12,
    fontSize: wp(4.5),
    fontWeight: 'bold',
    color: 'black',
  },
  add: {
    width: '30%',
    fontSize: wp(4),
    fontWeight: '600',
    color: 'grey',
    marginTop: hp(2),
    marginLeft: wp(2),
  },
});
