import {token, url} from '../Constants';
import {client, client2} from './client';
//import { shopify } from '@shopify/shopify-api';
import axios from 'axios';

class Shopify {
  storefrontAccessToken = 'd099c1a3a200a215e22a93f50d551938';

  static getCollection = async () => {
    try {
      const cls = client.collection.fetchAllWithProducts().then(collections => {
        return collections;
      });
      return cls;
    } catch (err) {
      console.log(err);
    }
  };
  static fetchProductById = productId => {
    try {
      const product = client.collection
        .fetchWithProducts(productId, {productsFirst: 10})
        .then(collection => {
          // Do something with the collection
          // console.log('Pord........', collection);
          return collection.products;
        });
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  static fetchProductOptionre = productId => {
    try {
      const data = client.product.fetch(productId).then(product => {
        return product;
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  static createCheckout = () => {
    try {
      const check = client.checkout.create().then(checkout => {
        // Do something with the checkout
        return checkout;
      });
      return check;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  static addLineItems = (checkoutId, lineItemsToAdd) => {
    try {
      const checkItems = client.checkout
        .addLineItems(checkoutId, lineItemsToAdd)
        .then(checkout => {
          // Do something with the updated checkout
          // Array with one additional line item
          return checkout.lineItems;
        });
      return checkItems;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  static createCart = () => {
    try {
      client.Cart.cart().then(carts => {
        console.log(carts); // An array of cart objects
      });
    } catch (err) {
      console.log('this is the erroo', err);
    }
  };
  static fetchAllProducts = () => {
    try {
      const pr = client.product.fetchAll().then(products => {
        return products;
      });
      return pr;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  static checkoutCart = () => {
    client.cart
      .createCart()
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(er);
      });
  };
  static shippingAddress = (address, checkoutId) => {
    console.log('this is id by checkout', checkoutId);
    try {
      client.checkout
        .updateShippingAddress(checkoutId, address)
        .then(checkout => {
          console.log(JSON.stringify(checkout));
        });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static userControll = async query => {
    console.log('calleddd,.....');
    try {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
        headers: {
          'X-Shopify-Storefront-Access-Token': token,
          'Access-Control-Origin': '*',
          'Content-Type': 'application/json',
        },
        data: query,
      };

      const res = await axios(config).then(result => {
        return result.data;
      });
      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  static fetchProduct = productId => {
    try {
      const data = client.product.fetch(productId).then(product => {
        return product;
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
export default Shopify;
