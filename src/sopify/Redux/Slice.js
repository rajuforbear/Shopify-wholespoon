import {createSlice} from '@reduxjs/toolkit';
export const MySlice = createSlice({
  name: 'sopify',
  initialState: {
    collection: [],
    isLoading: false,
    products: [],
    product: null,
    lineItems: null,
    cartItem: [],
    vid: null,
    checkoutId: null,
    userDetails: null,
    userToken: null,
    userRegDetails: null,
    userData: null,
    cartItem: null,
    item: [],
    deletCart: null,
    checkoutData: null,
    checkout: null,
    menu: null,
    id: null,
    about: null,
  },
  reducers: {
    getCollection: state => {
      state.isLoading = true;
    },
    getCollectionSuccess: (state, action) => {
      (state.isLoading = false), (state.collection = action.payload);
    },
    getCollectionFail: state => {
      state.isLoading = false;
    },
    fetchProductById: state => {
      state.isLoading = true;
    },
    fetchProductByIdSuccess: (state, action) => {
      (state.isLoading = false),
        ((state.products = action.payload), (state.id = action.id));
    },
    fetchProductByIdFaill: state => {
      state.isLoading = false;
    },
    fetchPorductOption: state => {
      state.isLoading = true;
    },
    fetchPorductOptionSuccess: (state, action) => {
      (state.isLoading = false), (state.product = action.payload);
    },
    fetchPorductOptionFail: (state, action) => {
      state.isLoading = false;
    },

    createCheckout: state => {
      state.isLoading = true;
    },
    createCheckoutSuccess: (state, action) => {
      state.isLoading = false;
      state.checkoutData = action.payload;
    },
    createCheckoutFaill: state => {
      state.isLoading = false;
    },
    addLineItem: state => {
      state.isLoading = true;
    },
    addLineItemSucess: (state, action) => {
      (state.isLoading = false), (state.lineItems = action.payload);
    },
    addLineItemFaill: state => {
      state.isLoading = false;
    },
    fetchAllProducts: state => {
      state.isLoading = true;
    },
    fetchAllProductsSuccess: (state, action) => {
      (state.isLoading = false),
        (state.products = action.payload),
        (state.checkoutId = action.checkId),
        (state.id = action.id);
    },
    fetchAllProductsFlaill: (state, action) => {
      state.isLoading = false;
    },
    addProductCart: (state, action) => {
      state.cartItem.push(action.payload);
      state.vid = action.vid;
    },
    createCheckoutcart: state => {
      state.isLoading = false;
    },
    login: state => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      (state.isLoading = false), (state.userToken = action.payload);
    },
    loginFail: state => {
      state.isLoading = false;
    },
    register: state => {
      state.isLoading = true;
    },
    registerSuccess: (state, action) => {
      (state.isLoading = false), (state.userRegDetails = action.payload);
    },
    registerError: state => {
      state.isLoading = false;
    },
    userDatareq: state => {
      state.isLoading = true;
    },
    userDataSuccess: (state, action) => {
      (state.isLoading = false), (state.userData = action.payload);
    },
    userDataError: state => {
      state.isLoading = false;
    },
    createCart: state => {
      state.isLoading = true;
    },
    createCartSuccess: (state, action) => {
      (state.isLoading = false), (state.cartItem = action.payload);
    },
    createCartError: state => {
      state.isLoading = false;
    },
    getCartItem: state => {
      state.isLoading = true;
    },
    getCartItemSuccess: (state, action) => {
      (state.isLoading = false), (state.cartItem = action.payload);
    },
    getCartItemFaill: state => {
      state.isLoading = false;
    },
    fetchProduct: state => {
      state.isLoading = true;
    },
    fetchProductSuccess: (state, action) => {
      state.item.push(action.payload), (state.isLoading = false);
    },
    fetchProductFaill: state => {
      state.isLoading = false;
    },
    cartItemRemove: state => {
      state.isLoading = true;
    },
    cartItemSuccess: (state, action) => {
      (state.isLoading = false), (state.cartItem = action.payload);
    },
    cartItemRemoveError: state => {
      state.isLoading = false;
    },
    updateCart: state => {
      state.isLoading = true;
    },
    updateCartSuccess: (state, action) => {
      (state.isLoading = false), (state.cartItem = action.payload);
    },
    updateCartFaill: state => {
      state.isLoading = false;
    },
    addAdressFaill: state => {
      state.isLoading = false;
    },
    addAddressSucess: (state, action) => {
      state.isLoading = false;
      state.checkout = action.payload;
    },
    addAdress: state => {
      state.isLoading = true;
    },
    fetchMenu: state => {
      state.isLoading = true;
    },
    fetchMenuSuccess: (state, action) => {
      state.isLoading = false;
      state.menu = action.payload;
    },
    fetchMenuError: state => {
      state.isLoading = false;
    },
    aboutUs: state => {
      state.isLoading = true;
    },
    aboutUsSuccess: (state, action) => {
      (state.isLoading = true), (state.about = action.payload);
    },
    aboutUsFail: state => {
      state.isLoading = false;
    },
  },
});
export const {getCollection, getCollectionSuccess, getCollectionFail} =
  MySlice.actions;
export default MySlice.reducer;
