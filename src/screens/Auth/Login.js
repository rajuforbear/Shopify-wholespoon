import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Input from '../../compoents/Input';
import Button from '../../compoents/Button';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../compoents/Loader';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const handleOnchange = (input, name) => {
    setInput(prev => ({...prev, [name]: input}));
  };
  ///console.log(input.password);
  const isLoading = useSelector(state => state.data.isLoading);
  //const userToken = useSelector(state => state.data.userToken);
  const handleLogin = () => {
    let data = JSON.stringify({
      query: `mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
            accessToken
        }
        customerUserErrors {
          message
        }
      }
    }`,
      variables: {input: {email: input.email, password: input.password}},
    });
    dispatch({
      type: 'sopify/login',
      navigation,
      data: data,
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      <ScrollView>
        <View style={styles.logoConatainer}>
          <Image
            style={styles.img}
            source={{
              uri: `https://cdn.shopify.com/s/files/1/0548/9570/6327/files/Wholespoon_logo_180x.png?v=1632130611`,
            }}
          />
        </View>

        <View style={styles.infoTextContainer}>
          <Text style={styles.login}>Login</Text>
          {/* <Text style={styles.info}>
            Please enter the details below to continue
          </Text> */}
          <View style={styles.line}></View>
        </View>
        <Input
          placeholder="Enter email address"
          iconName="mail"
          lable="Email"
          onChangeText={text => handleOnchange(text, 'email')}
        />
        <Input
          placeholder="Enter password"
          iconName="lock"
          lable="Password"
          onChangeText={text => handleOnchange(text, 'password')}
          password
        />
        <Button name="LOGIN" onPress={() => handleLogin()} />
        {/* <Text
          style={{
            alignSelf: 'flex-end',
            marginRight: '5%',
            fontSize: hp('2.4%'),
            color: 'grey',
          }}>
          Forgot password ?
        </Text>
        <Text
          style={{
            fontSize: hp('2.4%'),
            alignSelf: 'center',
            marginVertical: '3%',
            color: '#a26a39',
            fontStyle: 'italic',
          }}>
          Dont't have an account ?
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                fontSize: hp('2.4%'),
                color: '#a26a39',
                fontWeight: 'bold',
                fontStyle: 'italic',
              }}>
              {' '}
              Sign Up!
            </Text>
          </TouchableOpacity>
        </Text> */}
        <View
          style={{
            width: wp(65),
            alignSelf: 'center',
            marginTop: wp(5),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            onPress={() => navigation.navigate('Register')}
            style={styles.text}>
            Create Account
          </Text>
          <Text onPress={() => navigation.replace('Home')} style={styles.text}>
            Return to Store
          </Text>
          <Text onPress={() => navigation.navigate('Otp')} style={styles.text}>
            Forgot your password?
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0f2',
  },
  logoConatainer: {
    top: hp('1%'),
    width: '90%',
    height: hp('20%'),
    marginHorizontal: '5%',
  },
  infoTextContainer: {
    marginHorizontal: '5%',
    marginVertical: '1%',
  },
  login: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: 'black', //'#a26a39',
    //fontStyle: 'italic',
    alignSelf: 'center',
    marginTop: wp(6),
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  info: {
    fontSize: hp('2%'),
    fontWeight: '400',
    color: 'grey',
  },

  line: {
    borderWidth: wp(0.5),
    marginTop: wp(1),
    width: wp(12),
    alignSelf: 'center',
    borderRadius: wp(4),
    marginBottom: wp(4),
  },
  text: {
    fontSize: wp(5),
    fontWeight: '400',
    color: 'black',
    marginTop: wp(1),
  },
});
