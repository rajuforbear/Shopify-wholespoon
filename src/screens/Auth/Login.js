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

const Login = ({navigation}) => {
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
      <View style={styles.logoConatainer}>
        <Image
          style={styles.img}
          source={{
            uri: `https://cdn.shopify.com/s/files/1/0548/9570/6327/files/Wholespoon_logo_180x.png?v=1632130611`,
          }}
        />
      </View>
      <ScrollView>
        <View style={styles.infoTextContainer}>
          <Text style={styles.login}>Login</Text>
          <Text style={styles.info}>
            Please enter the details below to continue
          </Text>
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
        />
        <Button name="Login" onPress={() => handleLogin()} />
        <Text
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
            alignSelf: 'center',
            marginVertical: hp('5%'),
            fontSize: hp('2.5%'),
            color: 'grey',
          }}>
          Dont't have an account ?
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                color: '#0f3a8d',
                fontSize: hp('2.4%'),
                fontWeight: 'bold',
              }}>
              {' '}
              Sign Up!
            </Text>
          </TouchableOpacity>
        </Text>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: 'grey',
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
});
