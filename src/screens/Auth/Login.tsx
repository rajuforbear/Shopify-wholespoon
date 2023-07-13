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
import {CompositeScreenProps, useNavigation} from '@react-navigation/native';
import { RootState } from '../../sopify/Redux/store';
import { StackScreenProps } from '@react-navigation/stack';
import { HelperNavigationParams } from '../../navigation/Helper';
import { NavigationParams } from '../../navigation';
type Props = CompositeScreenProps<
StackScreenProps<NavigationParams,'Login'>,
  StackScreenProps<HelperNavigationParams>
>;

const Login:React.FC<Props> = ({navigation}) => {
  
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const handleOnchange = (input:string, name:string) => {
    setInput(prev => ({...prev, [name]: input}));
  };
  ///console.log(input.password);
  const isLoading = useSelector((state:RootState) => state.data.isLoading);
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
        <View style={{marginTop: wp(25)}}>
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
            iconName="mail"
            lable="Email"
            value={input.email}
            onChangeText={(text) => handleOnchange(text, 'email')}
            error=''
            isOtp={false}
            isPhone={false}
            password={false}
            placeholder=''
            onFocus={()=>null}
          />
          <Input
          
            iconName="lock"
            lable="Password"
            value={input.password}
            onChangeText={text => handleOnchange(text, 'password')}
            password
            error=''
            isOtp={false}
            isPhone={false}
            onFocus={()=>null}
            placeholder=''
          />
          <Button name="LOGIN" onPress={() => handleLogin()} />
         
          <View
            style={{
              width: wp(65),
              alignSelf: 'center',
              marginTop: wp(5),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              onPress={() => navigation.navigate('Register',{page:'login'})}
              style={styles.text}>
              Create Account
            </Text>
            <Text
              onPress={() => navigation.replace('Home')}
              style={styles.text}>
              Return to Store
            </Text>
            <Text
              onPress={() => navigation.navigate('Otp')}
              style={styles.text}>
              Forgot your password?
            </Text>
          </View>
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
