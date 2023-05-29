import {put, takeEvery, call} from 'redux-saga/effects';
import Shopify from '../API/Shopify';
import {getCollectionSuccess} from './Slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const data = yield call(Shopify.fetchProductById, action.prId);
    yield put({type: 'sopify/fetchProductByIdSuccess', payload: data});
    action.navigation.navigate('ProductList');
  } catch (err) {
    yield put({
      type: 'sopify/fetchProductByIdFaill',
    });
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
    const products = yield call(Shopify.fetchAllProducts);
    yield put({type: 'sopify/fetchAllProductsSuccess', payload: products});
    if (action?.page != 'home') {
      action.navigation.navigate('ProductList');
    }
  } catch (err) {
    yield put({type: 'sopify/fetchAllProductsFaill'});
  }
}
function* cartItem(action) {
  yield action.navigation.navigate('Cart');
}

function* doLogin(action) {
  try {
    const res = yield call(Shopify.userControll, action.data);
    console.log(JSON.stringify(res));
    const costumerToken =
      res.data.customerAccessTokenCreate.customerAccessToken?.accessToken;
    console.log(costumerToken);
    if (costumerToken != null) {
      yield AsyncStorage.setItem('Token', costumerToken);
      let data = JSON.stringify({
        query: `query {
      customer(customerAccessToken:${JSON.stringify(costumerToken)}) {
        id
        firstName
        lastName
        acceptsMarketing
        email
        phone
      }
    }`,
        variables: {},
      });
      yield put({
        type: 'sopify/loginSuccess',
        payload:
          res?.data.customerAccessTokenCreate.customerAccessToken.accessToken,
      });
      const user = yield call(Shopify.userControll, data);
      // console.log(user);
      yield put({
        type: 'sopify/userDataSuccess',
        payload: user.data.customer,
      });
      action.navigation.navigate('Home');
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
  const res = yield call(Shopify.userControll, action.data);
  console.log('this is res from regis', JSON.stringify(res));
}
function* getUserData(action) {
  try {
    const user = yield call(Shopify.userControll, action.data);
    console.log('this is userdata', user.data.customer);
    yield put({
      type: 'sopify/userDataSuccess',
      payload: user.data.customer,
    });
  } catch (err) {
    // yield put({
    //   type: 'sopify/userDataError',
    // });
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
    action.navigation.navigate('Cart');
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
    console.log(JSON.stringify(res));
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
  try {
    const res = yield call(Shopify.userControll, action.data);

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
}

export default Saga;
