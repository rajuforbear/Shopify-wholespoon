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
      handleError('Please Enter First Name', 'firstName');
      valid = false;
    }
    if (!inputs.lastName) {
      handleError('Please Enter Last Name', 'lastName');
      valid = false;
    }
    if (!inputs.email) {
      handleError('Please Enter Email', 'email');
      valid = false;
    } else if (
      !inputs.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      handleError('Please Enter Valid Email', 'email');
      valid = false;
    }

    if (!inputs.phone) {
      handleError('Please Enter Mobile Numer', 'phone');
      valid = false;
    } else if (inputs.phone.length < 10) {
      handleError('Please Enter 10 Digit Mobile Number', 'phone');
      valid = false;
    }
    if (!inputs.password) {
      handleError('Please Enter Password', 'password');
      valid = false;
    } else if (!inputs.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
      handleError(
        'Password Must Contain Special Charecters',
        'password',
      );
      valid = false;
    }

    if (!inputs.confrimPassword) {
      handleError('please re-enter your password', 'confrimPassword');
      valid = false;
    } else if (inputs.password != inputs.confrimPassword) {
      handleError("Password Dosen't Matched", 'confrimPassword');
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
          <Text style={styles.login}>Create Account</Text>
          {/* <Text style={styles.info}>
            Please enter the details below to continue
          </Text> */}
          <View style={styles.line}></View>
        </View>

        <Input
          //  lable="First Name"
          lable="First name"
          onChangeText={text => {
            handleOnchange(text, 'firstName');
          }}
          iconName="user"
          error={errors.firstName}
          onFocus={() => handleError(null, 'firstName')}
        />
        <Input
          //  /lable="Last Name"
          lable="Last name"
          onChangeText={text => {
            handleOnchange(text, 'lastName');
          }}
          iconName="user"
          onFocus={() => handleError(null, 'lastName')}
          error={errors.lastName}
        />
        <Input
          // /lable="E-mail"
          lable="E-mail"
          onChangeText={text => {
            handleOnchange(text, 'email');
          }}
          iconName="mail"
          onFocus={() => handleError(null, 'email')}
          error={errors.email}
        />
        <Input
          // lable="Telephone"
          lable="Telephone"
          onChangeText={text => {
            handleOnchange(text, 'phone');
          }}
          iconName="phone"
          error={errors.phone}
          onFocus={() => handleError(null, 'phone')}
        />
        <Input
          // lable="Password"
          lable="Password"
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
          lable="Confirm  Password"
          onChangeText={text => {
            handleOnchange(text, 'confrimPassword');
          }}
          iconName="lock"
          password
          error={errors.confrimPassword}
          onFocus={() => handleError(null, 'confrimPassword')}
        />
        <Button
          name="CREATE"
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
    color: '#a26a39',
    fontStyle: 'italic',
  },
  line: {
    borderWidth: wp(0.6),
    marginTop: wp(2),
    width: wp(30),
    alignSelf: 'center',
    borderRadius: wp(4),
  },
});
