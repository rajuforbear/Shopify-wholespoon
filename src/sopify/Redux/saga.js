import {put, takeEvery, call} from 'redux-saga/effects';
import Shopify from '../API/Shopify';
import {getCollectionSuccess} from './Slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

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
    action.navigation.navigate('ProductList', {title: action.title});
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
    if (action?.page != 'home') {
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
      action.navigation.replace('Home');
    } else {
      yield put({
        type: 'sopify/loginFail',
      });
      console.log(
        res.data.customerAccessTokenCreate.customerUserErrors[0].message,
      );
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
    if (res.data) {
      yield put({
        type: 'sopify/registerSuccess',
        payload: res.data.customerCreate.customer,
      });
      action.navigation.replace('Login');
    } else {
      yield put({
        type: 'sopify/registerError',
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
    console.log(user);
    if (user.data) {
      yield put({
        type: 'sopify/userDataSuccess',
        payload: user.data.customer,
      });
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
    action.navigation.navigate('Address');
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
  let address = action.iseSevedAddres;
  delete address.email;
  let chek = action.check;
  try {
    const res = yield call(Shopify.shippingAddress, chek, address);
    console.log('this is res from add..', JSON.stringify(res));
    yield put({
      type: 'sopify/addAddressSucess',
      payload: res,
    });
    //action.navigation.navigate('Payment');
  } catch (err) {
    yield put({
      type: 'sopify/addAdressFaill',
    });
    console.log(err);
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
        type: 'sopify/aboutUsSuccess',
        payload: res.data.page.body,
      });
      action.navigation.navigate('About');
    } else {
      yield put({
        type: 'sopify/aboutUsFaill',
      });
    }
  } catch (error) {
    yield put({
      type: 'sopify/aboutUsFaill',
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
  yield takeEvery('sopify/aboutUs', aboutUs);
}

export default Saga;
