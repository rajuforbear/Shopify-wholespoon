import {put, takeEvery, call} from 'redux-saga/effects';
import Shopify from '../API/Shopify';
import {getCollectionSuccess} from './Slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';
import {query} from '../../screens/main/Home/query';

function* getCollection() {
  try {
    const data = yield call(Shopify.getCollection);
    yield put(getCollectionSuccess(data));
  } catch (err) {
    yield put({type: 'spify/getCollectionFail'});
  }
}
function* getProductById(action) {
  try {
    console.log('fetch product bt id calleda');
    const data = yield call(
      Shopify.fetchProductById,
      action.prId,
      action.length,
    );
    yield put({
      type: 'sopify/fetchProductByIdSuccess',
      payload: data,
      id: action.prId,
    });
    if (action.page === 'home') {
      action.navigation.navigate('ProductList', {title: action.title});
    }
  } catch (err) {
    yield put({
      type: 'sopify/fetchProductByIdFaill',
    });
    console.log(err);
  }
}

function* fetchProductOption(action) {
  try {
    const option = yield call(Shopify.fetchProductOptionre, action.options);
    yield put({
      type: 'sopify/fetchPorductOptionSuccess',
      payload: option,
    });
  } catch (err) {
    yield put({
      type: 'sopify/fetchPorductOptionFail',
      // payload: option,
    });
  }
}

function* fetAllProducts(action) {
  try {
    const products = yield call(Shopify.fetchAllProducts, action.length);
    // console.log('this is the all products', products);
    yield put({
      type: 'sopify/fetchAllProductsSuccess',
      payload: products,
      id: action.id,
    });
    if (action?.id === 'home') {
      action.navigation.navigate('ProductList', {title: action.title});
    }
  } catch (err) {
    yield put({type: 'sopify/fetchAllProductsFaill'});
    console.log(err);
  }
}
function* cartItem(action) {
  yield action.navigation.navigate('Cart');
}

function* doLogin(action) {
  try {
    const res = yield call(Shopify.userControll, action.data);
    //console.log(JSON.stringify(res));
    const costumerToken =
      res.data.customerAccessTokenCreate.customerAccessToken?.accessToken;
    console.log(costumerToken);
    if (costumerToken != null) {
      yield AsyncStorage.setItem('Token', costumerToken);
      yield put({
        type: 'sopify/loginSuccess',
        payload:
          res?.data.customerAccessTokenCreate.customerAccessToken.accessToken,
      });
      Toast.show({
        type: 'info',
        text1: 'Successfully Loged in',
      });
      action.navigation.replace('Home');
    } else {
      yield put({
        type: 'sopify/loginFail',
      });
      Toast.show({
        type: 'info',
        text1: res.data.customerAccessTokenCreate.customerUserErrors[0].message,
      });
    }
    //
  } catch (err) {
    yield put({
      type: 'sopify/loginFail',
    });
  }
}
function* doRegister(action) {
  try {
    const res = yield call(Shopify.userControll, action.data);
    console.log(JSON.stringify(res.data));
    if (res.data.customerCreate.customer != null) {
      yield put({
        type: 'sopify/registerSuccess',
        payload: res.data.customerCreate.customer,
      });
      Toast.show({
        type: 'info',
        text1: 'Account created  Successfully',
      });
      action.navigation.replace('Login');
    } else {
      yield put({
        type: 'sopify/registerError',
      });
      Toast.show({
        type: 'info',
        text1: 'somethig went wrong',
      });
    }
  } catch (err) {
    yield put({
      type: 'sopify/registerError',
    });
  }
}
function* getUserData(action) {
  try {
    const user = yield call(Shopify.userControll, action.data);
    // console.log('this is neew user', user);
    if (user.data) {
      yield put({
        type: 'sopify/userDataSuccess',
        payload: user.data.customer,
      });
      if (action.msg) {
        Toast.show({
          type: 'info',
          text1: action.msg,
        });
      }
      if (action.page != 'home') {
        action.navigation.navigate('Profile');
      }
    } else {
      yield put({
        type: 'sopify/userDataError',
      });
    }
  } catch (err) {
    yield put({
      type: 'sopify/userDataError',
    });
  }
}
function* createCart(action) {
  console.log('called');
  try {
    const cartdata = yield call(Shopify.userControll, action.data);
    console.log('this is cart data', JSON.stringify(cartdata));
    let tempdartdata = null;
    if (action.id === 'createCart') {
      yield AsyncStorage.setItem('cartId', cartdata.data?.cartCreate.cart.id);
      tempdartdata = cartdata.data?.cartCreate.cart;
    } else if (action.id === 'addItem') {
      tempdartdata = cartdata.data?.cartLinesAdd.cart;
    }
    yield put({
      type: 'sopify/createCartSuccess',
      payload: tempdartdata,
    });
    //action.navigation.navigate('Cart');
    Alert.alert('Added successs');
  } catch (error) {
    yield put({
      type: 'sopify/createCartError',
    });
    console.log(error);
  }
}
function* getCartItem(action) {
  //console.log('raju barde');
  try {
    const res = yield call(Shopify.userControll, action.data);
    //console.log(JSON.stringify(res));
    yield put({
      type: 'sopify/getCartItemSuccess',
      payload: res?.data?.cart,
    });
  } catch (error) {
    yield put({
      type: 'getCartItemFaill',
    });
    console.log(error);
  }
}
function* fetchProduct(action) {
  try {
    const res = yield call(Shopify.fetchProduct, action.pId);
    yield put({
      type: 'sopify/fetchProductSuccess',
      payload: res,
    });
  } catch (err) {
    yield put({
      type: 'sopify/fetchProductFaill',
    });
  }
}
function* removeCartItem(action) {
  try {
    const res = yield call(Shopify.userControll, action.data);
    console.log('this is res from remove', JSON.stringify(res));
    yield put({
      type: 'sopify/cartItemSuccess',
      payload: res?.data?.cartLinesRemove?.cart,
    });
  } catch (error) {
    yield put({
      type: 'sopify/cartItemRemoveError',
    });
  }
  // console.log('remove called....');
}
function* createCheckout(action) {
  // console.log('create checkout called');
  try {
    const res = yield call(Shopify.userControll, action.data);
    console.log('this is checkout data...', JSON.stringify(res));

    yield put({
      type: 'sopify/createCheckoutSuccess',
      payload: res.data.checkoutCreate.checkout,
    });
    action.navigation.navigate('Checkout');
  } catch (error) {
    yield put({
      type: '/sopify/createCheckoutFaill',
    });
    console.log(error);
  }
}
function* updateCart(action) {
  try {
    const res = yield call(Shopify.userControll, action.data);
    if (res?.data?.cartLinesUpdate != null) {
      yield put({
        type: 'sopify/updateCartSuccess',
        payload: res?.data?.cartLinesUpdate.cart,
      });
    } else {
      yield put({
        type: 'sopify/updateCartFaill',
      });
      console.log('this is error', JSON.stringify(res));
    }
  } catch (err) {
    yield put({
      type: 'sopify/updateCartFaill',
    });
    console.log(err);
  }
}
function* addAddress(action) {
  try {
    let data = JSON.stringify({
      query: `query{
        customer(customerAccessToken:${JSON.stringify(action.token)}){
        ${query}
    }`,
      variables: {},
    });
    const res = yield call(Shopify.userControll, action.data);
    console.log(JSON.stringify(res));
    if (res.data?.customerAddressCreate.customerAddress != null) {
      console.log(true);
      yield put({
        type: 'sopify/addAddressSucess',
        payload: res.data.customerAddressCreate.customerAddress,
      });
      if (action.op != 'create') {
        action.navigation.goBack();
      }
      yield put({
        type: 'sopify/userDatareq',
        data: data,
        page: 'home',
        navigation: action.navigation,
        msg: action.msg,
      });
    } else {
      yield put({
        type: 'sopify/addAddressFaill',
      });
      console.log(res.data.customerAddressCreate);
      Toast.show({
        type: 'info',
        text1: res.data
          ? res?.data?.customerAddressCreate.customerUserErrors[0]?.code
          : 'Message',
        text2: res.data
          ? res?.data?.customerAddressCreate.customerUserErrors[0]?.message
          : 'Something went wrong',
      });
    }
  } catch (error) {
    console.log(error);
    Toast.show({
      type: 'info',
      text1: 'something went wrong',
    });
    yield put({
      type: 'sopify/addAddressFaill',
    });
  }
}
function* fetchMenu(action) {
  console.log('call 2');
  try {
    const res = yield call(Shopify.userControll, action.data);
    if (res.data) {
      yield put({
        type: 'sopify/fetchMenuSuccess',
        payload: res.data.menu,
      });
      action.navigation.openDrawer();
    } else {
      yield put({
        type: 'sopify/fetchMenuError',
      });
    }
  } catch (err) {
    yield put({
      type: 'sopify/fetchMenuError',
    });
    console.log(err);
  }
}
function* aboutUs(action) {
  try {
    const res = yield call(Shopify.userControll, action.data);
    if (res.data) {
      yield put({
        type: 'sopify/pageDeatailsSuccess',
        payload: res.data.page.body,
      });

      action.navigation.navigate('About');
    } else {
      yield put({
        type: 'sopify/pageDeatailsFaill',
      });
    }
  } catch (error) {
    yield put({
      type: 'sopify/pageDeatailsFaill',
    });
  }
}
function* fetchPages(action) {
  try {
    const res = yield call(Shopify.userControll, action.data);
    if (res.data) {
      yield put({
        type: 'sopify/fetchPagesSuccess',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'sopify/fetchPagesError',
      });
    }
  } catch (er) {
    yield put({
      type: 'sopify/fetchPagesError',
    });
    console.log(er);
  }
}
function* deleteAddress(action) {
  try {
    let data = JSON.stringify({
      query: `query{
        customer(customerAccessToken:${JSON.stringify(action.token)}){
        ${query}
    }`,
      variables: {},
    });
    const res = yield call(Shopify.userControll, action.data);
    if (res.data.customerAddressDelete.deletedCustomerAddressId != null) {
      yield put({
        type: 'sopify/deleteAddressSuccess',
        payload: 1,
      });

      yield put({
        type: 'sopify/userDatareq',
        data: data,
        page: 'home',
        navigation: action.navigation,
        msg: 'Address Deleted Successfully',
      });
    } else {
      yield put({
        type: 'sopify/deleteAddressError',
      });
      Toast.show({
        type: 'info',
        text1: 'Somethig went wrong',
      });
    }
  } catch (err) {
    yield put({
      type: 'sopify/deleteAddressError',
    });
    console.log(err);
    Toast.show({
      type: 'info',
      text1: 'Somethig went wrong',
    });
  }
}
function* updateAddress(action) {
  try {
    let data = JSON.stringify({
      query: `query{
        customer(customerAccessToken:${JSON.stringify(action.token)}){
        ${query}
    }`,
      variables: {},
    });
    const res = yield call(Shopify.userControll, action.data);
    console.log(JSON.stringify(res));
    if (res.data.customerAddressUpdate.customerAddress != null) {
      yield put({
        type: 'sopify/updateAddressSuccess',
        payload: res.data.customerAddressUpdate.customerAddress,
      });
      if (action.op != 'create') {
        action.navigation.goBack();
      }
      yield put({
        type: 'sopify/userDatareq',
        data: data,
        page: 'home',
        navigation: action.navigation,
        msg: action.msg,
      });
      if (action.check) {
        yield put({
          type: 'sopify/setDefaulAddress',
          id: action.id,
          token: action.token,
          navigation: action.navigation,
          msg: action.msg,
          data: data,
        });
      } else {
        yield put({
          type: 'sopify/userDatareq',
          data: data,
          page: 'home',
          navigation: action.navigation,
          msg: action.msg,
        });
      }
    } else {
      yield put({
        type: 'sopify/updateAddressFail',
      });
      Toast.show({
        type: 'info',
        text1: 'Something went wrong',
      });
    }
  } catch (err) {
    console.log(err);
    yield put({
      type: 'sopify/updateAddressFail',
    });
    Toast.show({
      type: 'info',
      text1: 'Something went wrong',
    });
  }
}
function* setDefaulAddress(action) {
  try {
    console.log('jhfdfdjfj   calledd.......................');
    let data = JSON.stringify({
      query: `mutation customerDefaultAddressUpdate($addressId: ID!, $customerAccessToken: String!) {
    customerDefaultAddressUpdate(addressId: $addressId, customerAccessToken: $customerAccessToken) {
      customer {
           firstName
      }
      customerUserErrors {
        code
        field
        message
      }
    } 
}`,
      variables: {
        addressId: action.id,
        customerAccessToken: action.token,
      },
    });
    const res = yield call(Shopify.userControll, data);
    if (res.data.customerDefaultAddressUpdate.customer != null) {
      yield put({
        type: 'setDefaulAddressSuccess',
      });
      yield put({
        type: 'sopify/userDatareq',
        data: action.data,
        page: 'home',
        navigation: action.navigation,
        msg: action.msg,
      });
    } else {
      yield put({
        type: 'setDefaulAddressError',
      });
    }
  } catch (err) {
    yield put({
      type: 'setDefaulAddressError',
    });
  }
}
function* updateProfile(action) {
  try {
    const res = yield call(Shopify.userControll, action.data);
    console.log('this is acceptmarketinhg ', JSON.stringify(res));
    if (res?.data?.customerUpdate?.customer != null) {
      yield put({
        type: 'sopify/updateProfileSuccess',
      });
      let accessToken = res?.data.customerUpdate.customerAccessToken;
      console.log('this is access Token', accessToken);
      if (accessToken != null) {
        console.log('this is saved accestoken');
        yield AsyncStorage.setItem('Token', accessToken);
      }
      action.navigation.goBack();
      const token = yield AsyncStorage.getItem('Token');
      console.log('this is saved accestoken', token);
      let data = JSON.stringify({
        query: `query{
        customer(customerAccessToken:${JSON.stringify(token)}){
        ${query}
    }`,
        variables: {},
      });
      yield put({
        type: 'sopify/userDatareq',
        data: data,
        page: 'home',
        navigation: action.navigation,
      });
      Toast.show({
        type: 'info',
        text1: 'Profile update Successfull',
      });
    } else {
      yield put({
        type: 'sopify/updateProfileFaill',
      });
      Toast.show({
        type: 'info',
        text1: res.data.customerUpdate.customerUserErrors[0]?.code,
        text2: res.data.customerUpdate.customerUserErrors[0]?.message,
      });
    }
  } catch (err) {
    yield put({
      type: 'sopify/updateProfileFaill',
    });
    console.log(err);
    Toast.show({
      type: 'info',
      text1: 'Something went wrong',
    });
  }
}
function* resetPassword(action) {
  try {
    const res = yield call(Shopify.userControll, action.data);
    console.log(JSON.stringify(res));

    if (res.data?.customerRecover?.customerUserErrors.length <= 0) {
      yield put({
        type: 'sopify/resetPasswordSuccess',
      });
      Toast.show({
        type: 'info',
        text1: 'Eamil Sent Success',
        text2: 'Please check your email box',
      });

      setTimeout(() => {
        action.navigation.goBack();
      }, 1500);
    } else if (res.data?.customerRecover?.customerUserErrors.length > 0) {
      yield put({
        type: 'sopify/resetPasswordError',
      });
      console.log(JSON.stringify(res));
      Toast.show({
        type: 'info',
        text1: res.data?.customerRecover?.customerUserErrors[0]?.message,
      });
    } else {
      yield put({
        type: 'sopify/resetPasswordError',
      });
      Toast.show({
        type: 'info',
        text1: 'Limit Exceeded',
        text2: 'Resetting password limit exceeded. Please try again later.',
      });
    }
  } catch (err) {
    console.log(err);
    yield put({
      type: 'sopify/resetPasswordError',
    });
    Toast.show({
      type: 'info',
      text1: 'Something went wrong',
    });
  }
}
function* updateCheckout(action) {
  try {
    const res = yield call(Shopify.updateCheckout, action.id, action.address);
    if (res.data.id) {
      yield put({
        type: 'sopify/updateCheckoutSuccess',
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err);
    yield put({
      type: 'sopify/updateCheckoutError',
    });
  }
}
function* Saga() {
  yield takeEvery('sopify/getCollection', getCollection);
  yield takeEvery('sopify/fetchProductById', getProductById);
  yield takeEvery('sopify/fetchPorductOption', fetchProductOption);
  yield takeEvery('sopify/fetchAllProducts', fetAllProducts);
  yield takeEvery('sopify/addProductCart', cartItem);
  yield takeEvery('sopify/login', doLogin);
  yield takeEvery('sopify/register', doRegister);
  yield takeEvery('sopify/userDatareq', getUserData);
  yield takeEvery('sopify/createCart', createCart);
  yield takeEvery('sopify/getCartItem', getCartItem);
  yield takeEvery('sopify/fetchProduct', fetchProduct);
  yield takeEvery('sopify/cartItemRemove', removeCartItem);
  yield takeEvery('sopify/createCheckout', createCheckout);
  yield takeEvery('sopify/updateCart', updateCart);
  yield takeEvery('sopify/addAdress', addAddress);
  yield takeEvery('sopify/fetchMenu', fetchMenu);
  yield takeEvery('sopify/pageDeatails', aboutUs);
  yield takeEvery('sopify/fetchPages', fetchPages);
  yield takeEvery('sopify/deleteAddress', deleteAddress);
  yield takeEvery('sopify/updateAddress', updateAddress);
  yield takeEvery('sopify/setDefaulAddress', setDefaulAddress);
  yield takeEvery('sopify/updateProfile', updateProfile);
  yield takeEvery('sopify/resetPassword', resetPassword);
  yield takeEvery('sopify/updateCheckout', updateCheckout);
}

export default Saga;
