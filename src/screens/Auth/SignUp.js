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
  const [errors, setErros] = useState({});
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
  const Vailidate = () => {
    let valid = true;
    if (!inputs.firstName) {
      handleError('please enter first name', 'firstName');
      valid = false;
    }
    if (!inputs.lastName) {
      handleError('please enter last name', 'lastName');
      valid = false;
    }
    if (!inputs.email) {
      handleError('please enter email', 'email');
      valid = false;
    } else if (
      !inputs.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      handleError('email not vailid', 'email');
      valid = false;
    }

    if (!inputs.phone) {
      handleError('please enter mobile numer', 'phone');
      valid = false;
    } else if (inputs.phone.length < 10) {
      handleError('please enter 10 digit of mobile', 'phone');
      valid = false;
    }
    if (!inputs.password) {
      handleError('please enter password', 'password');
      valid = false;
    } else if (!inputs.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
      handleError(
        'pasword must be an Uppercase,a special charter and A number and greater then 8 character ',
        'password',
      );
      valid = false;
    }

    if (!inputs.confrimPassword) {
      handleError('please re-enter your password', 'confrimPassword');
      valid = false;
    } else if (inputs.password != inputs.confrimPassword) {
      handleError("password dosen't matched", 'confrimPassword');
      valid = false;
    }
    if (valid) {
      //hanleOnPress();
    }
    console.log(valid);
  };
  const handleError = (errorMassege, input) => {
    setErros(prevState => ({...prevState, [input]: errorMassege}));
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 30}}>
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

        <Input
          //  lable="First Name"
          placeholder="First name"
          onChangeText={text => {
            handleOnchange(text, 'firstName');
          }}
          iconName="user"
          error={errors.firstName}
          onFocus={() => handleError(null, 'firstName')}
        />
        <Input
          //  /lable="Last Name"
          placeholder="Last name"
          onChangeText={text => {
            handleOnchange(text, 'lastName');
          }}
          iconName="user"
          onFocus={() => handleError(null, 'lastName')}
          error={errors.lastName}
        />
        <Input
          // /lable="E-mail"
          placeholder="E-mail"
          onChangeText={text => {
            handleOnchange(text, 'email');
          }}
          iconName="mail"
          onFocus={() => handleError(null, 'email')}
          error={errors.email}
        />
        <Input
          // lable="Telephone"
          placeholder="Telephone"
          onChangeText={text => {
            handleOnchange(text, 'phone');
          }}
          iconName="phone"
          error={errors.phone}
          onFocus={() => handleError(null, 'phone')}
        />
        <Input
          // lable="Password"
          placeholder="Password"
          onChangeText={text => {
            handleOnchange(text, 'password');
          }}
          iconName="lock"
          password
          error={errors.password}
          onFocus={() => handleError(null, 'password')}
        />
        <Input
          // lable="Confirm Password"
          placeholder="Confirm  Password"
          onChangeText={text => {
            handleOnchange(text, 'confrimPassword');
          }}
          iconName="lock"
          password
          error={errors.confrimPassword}
          onFocus={() => handleError(null, 'confrimPassword')}
        />
        <Button
          name="Register"
          onPress={() => {
            //hanleOnPress();
            Vailidate();
          }}
        />
        <View style={{height: hp('8%')}}>
          <Text
            style={{
              fontSize: hp('2.4%'),
              alignSelf: 'center',
              marginVertical: '3%',
              color: '#a26a39',
              fontStyle: 'italic',
            }}>
            Already have an account ?{' '}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  fontSize: hp('2.4%'),
                  color: '#a26a39',
                  fontWeight: 'bold',
                  fontStyle: 'italic',
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
    marginVertical: '4%',
  },
  login: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: '#a26a39',
    fontStyle: 'italic',
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  info: {
    fontSize: hp('2%'),
    fontWeight: '400',
    color: '#a26a39',
    fontStyle: 'italic',
  },
});
