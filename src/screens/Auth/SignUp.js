import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confrimPassword: '',
  });
  const isLoading = useSelector(state => state.data.isLoading);
  const handleOnchange = (input, name) => {
    setInputs(prev => ({...prev, [name]: input}));
  };
  const hanleOnPress = () => {
    if (inputs.password != inputs.confrimPassword) {
      alert('Please match the password');
    } else {
      Register();
    }
  };
  const Register = () => {
    let data = JSON.stringify({
      query: `mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            firstName
            lastName
            email
            phone
            acceptsMarketing
          }
          customerUserErrors {
            field
            message
            code
          }
        }
      }`,
      variables: {
        input: {
          acceptsMarketing: true,
          email: inputs.email,
          firstName: inputs.firstName,
          lastName: inputs.lastName,
          password: inputs.password,
          phone: inputs.phone,
        },
      },
    });
    dispatch({
      type: 'sopify/register',
      data: data,
      navigation,
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
      <View style={styles.infoTextContainer}>
        <Text style={styles.login}>Register</Text>
        <Text style={styles.info}>
          Please enter the details below to continue
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 30}}>
        <Input
          lable="First Name"
          placeholder="First name"
          onChangeText={text => {
            handleOnchange(text, 'firstName');
          }}
        />
        <Input
          lable="Last Name"
          placeholder="Last name"
          onChangeText={text => {
            handleOnchange(text, 'lastName');
          }}
        />
        <Input
          lable="E-mail"
          placeholder="E-mail"
          onChangeText={text => {
            handleOnchange(text, 'email');
          }}
        />
        <Input
          lable="Telephone"
          placeholder="Telephone"
          onChangeText={text => {
            handleOnchange(text, 'phone');
          }}
        />
        <Input
          lable="Password"
          placeholder="Password"
          onChangeText={text => {
            handleOnchange(text, 'password');
          }}
        />
        <Input
          lable="Confirm Password"
          placeholder="Confirm  Password"
          onChangeText={text => {
            handleOnchange(text, 'confrimPassword');
          }}
        />
        <Button
          name="Register"
          onPress={() => {
            hanleOnPress();
          }}
        />
        <View style={{height: hp('8%')}}>
          <Text
            style={{
              fontSize: hp('2.4%'),
              alignSelf: 'center',
              marginVertical: '3%',
            }}>
            Already have an account ?{' '}
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: hp('2.4%'),
                  color: '#0f3a8d',
                  fontWeight: 'bold',
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;

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
    marginVertical: '4%',
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
