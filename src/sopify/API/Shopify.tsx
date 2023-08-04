import {Node} from '../../Types/user';
import {token, url} from '../Constants';
import {client} from './client';
import axios from 'axios';

class Shopify {
  storefrontAccessToken = 'd099c1a3a200a215e22a93f50d551938';

  static getCollection = async () => {
    try {
      const cls = client.collection
        .fetchAllWithProducts()
        .then((collections: any) => {
          return collections;
        });
      return cls;
    } catch (err) {
      console.log(err);
    }
  };
  static fetchProductById = (productId: string, length: number) => {
    type product = {
      products: any;
    };
    try {
      const product = client.collection
        .fetchWithProducts(productId, {productsFirst: length})
        .then((collection: product) => {
          // Do something with the collection
          // console.log('Pord........', collection);
          return collection.products;
        });
      return product;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  static fetchProductOptionre = (productId: string) => {
    try {
      const data = client.product.fetch(productId).then((product: any) => {
        return product;
      });
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  static addLineItems = (checkoutId: string, lineItemsToAdd: any) => {
    try {
      const checkItems = client.checkout
        .addLineItems(checkoutId, lineItemsToAdd)
        .then((checkout: any) => {
          // Do something with the updated checkout
          // Array with one additional line item
          return checkout.lineItems;
        });
      return checkItems;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  static updateCheckout = (check: string, address: Node) => {
    //console.log('this is id by checkout', checkoutId);
    try {
      const res = client.checkout
        .updateShippingAddress(check, address)
        .then((checkout: any) => {
          return checkout;
        });
      return res;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  static userControll = async (query: string) => {
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
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
  static fetchProduct = (productId: string) => {
    try {
      const data = client.product.fetch(productId).then((product: any) => {
        return product;
      });
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  static fetchAllProducts = (length: number) => {
    try {
      const pr = client.product.fetchAll(length).then((products: any) => {
        return products;
      });
      return pr;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
export default Shopify;
