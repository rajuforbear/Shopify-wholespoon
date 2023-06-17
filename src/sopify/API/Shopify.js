import {token, url} from '../Constants';
import {client, client2} from './client';
// import {Shopify} from '@shopify/shopify-api';
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
  static fetchProductById = (productId, length) => {
    console.log('called by id');
    try {
      const product = client.collection
        .fetchWithProducts(productId, {productsFirst: length})
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
  static fetchAllProducts = length => {
    try {
      const pr = client.product.fetchAll(length).then(products => {
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
  static shippingAddress = (check, address) => {
    //console.log('this is id by checkout', checkoutId);
    try {
      const res = client.checkout
        .updateShippingAddress(check, address)
        .then(checkout => {
          return checkout;
        });
      return res;
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
  static getCountryList = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://wholespoon.in/cart/c/c1-2af33925f99c58cf92c28b02a8407a2c',
      headers: {
        Cookie:
          'Cookie_1=value; _cmp_a=%7B%22purposes%22%3A%7B%22a%22%3Atrue%2C%22p%22%3Atrue%2C%22m%22%3Atrue%2C%22t%22%3Atrue%7D%2C%22display_banner%22%3Afalse%2C%22merchant_geo%22%3A%22IN%22%2C%22sale_of_data_region%22%3Afalse%7D; _landing_page=%2Fcheckouts%2Fcn%2Fc1-2af33925f99c58cf92c28b02a8407a2c; _orig_referrer=https%3A%2F%2Fwholespoon.in%2Fcart%2Fc%2Fc1-2af33925f99c58cf92c28b02a8407a2c; _s=73b57b39-7ced-485c-b6e2-0bea2239a0b2; _shopify_s=73b57b39-7ced-485c-b6e2-0bea2239a0b2; _shopify_y=ac104337-1f2b-490c-b89a-8a0d833efa9a; _y=ac104337-1f2b-490c-b89a-8a0d833efa9a; cart_currency=INR; cart_sig=876000089da1d6ba391b179b42903f9e; checkout_session_lookup=%7B%22version%22%3A1%2C%22keys%22%3A%5B%7B%22source_id%22%3A%22c1-55c544b2b808253774157abb9c29f878%22%2C%22checkout_session_identifier%22%3A%22ea3c1ab07d5ebd979cbc9972d69c9fbc%22%2C%22source_type_abbrev%22%3A%22cn%22%2C%22updated_at%22%3A%222023-05-25T10%3A04%3A30.100Z%22%7D%2C%7B%22source_id%22%3A%22c1-2af33925f99c58cf92c28b02a8407a2c%22%2C%22checkout_session_identifier%22%3A%226051479cb4da7ecd398c93d631d99177%22%2C%22source_type_abbrev%22%3A%22cn%22%2C%22updated_at%22%3A%222023-06-12T05%3A58%3A36.330Z%22%7D%5D%7D; checkout_session_token__cn__c1-2af33925f99c58cf92c28b02a8407a2c=%7B%22token%22%3A%22bkRxWXpXOGd2QUNCWTR0Rk1mRUJLZGs2MUkrenY5TFdOVENiRzF5NWY4WG96TDMwV09uYzRuc1UyU2cxaEpNZm5qbEpDVnZlS0dzT2tJd3lNeFhaNHU0aC8xME9xMzNWS2FxUjc4OHlBNDNLdGlpNk9iVWJBbTMxWjU3ZExPVVdCWG0vRnRpd2FaQWZhK1Izb3hZSUJxTWtCanFZNTNMbk1jWk16V1pFb1N0TWtyRFBYOE83YWFQRVhMb1dmOFp0UVhxcjdNcnlWOWlyMkJxQTErbFY1V1lUYzVxSjB1aVNYeWJQd3l5TkxJTWdmSWcvM3pSbDAxVT0tLXloWnRHWW9hSEFLRHBhMmgtLVduU1hCVXNWUndNOUdVeHB0Nit1N2c9PQ%22%2C%22locale%22%3A%22en-IN%22%7D; checkout_session_token__cn__c1-55c544b2b808253774157abb9c29f878=%7B%22token%22%3A%22T05UY01NKzdhVHR2ald4ZE1RR2FiK3R0MG9UQ3lZb2d1OWV3eS9HUlVUUTBWdU9WQWpic0VFdjJDNTErOFdIbTQwZEU1Z1V4T0xIai9sVDVTR09KWVIzSkJQS1h4bk9CSDFNY3ZXM3J0UTZ6R1VVQitnL3R3VkJhUjF1N1JUL2VwdWJoOTBheXowdTZ5SW5mdFlJQWczdzFIWXhsY1hxcjYyNEdlM0Mvek9HaVovK1FjZUtBeWNqN1hDb3ZVK01HM0p1ODJjUHFJVHpkNW1wbXZGZllkNFd2eU1tM3libDVpbVVxTmFkQnkwZE9SSnJYM0wwQVlOMD0tLURNaFRFZ0NVMDQ1aXVyZWYtLU4wMjBrNnV0cnFxb0trcEZYUW9iR2c9PQ%22%2C%22locale%22%3A%22en-IN%22%7D; localization=IN; queue_token=AheqHSdteg3QYvN2gRVeScWAz1kN_gCqHMgCdJyRkZROcg7zChWHrgJd0VBRgwE1Xv1MDof-MYDCu6MDmUMDcr-uL_4xvEljuVr98N1t832zJtNokWOOWdDLlPEcoy7GZMvbUASdCDHRFwK8tEFALC4FlcFa8X506gjjpigdgg4Y; secure_customer_sig=',
      },
    };

    const check = axios
      .request(config)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
    return check;
  };

  static province = () => {
    const shopifyStorefrontUrl = 'wholespoon-india.myshopify.com';
    const storefrontAccessToken = 'd099c1a3a200a215e22a93f50d551938';
    const countryIsoCode = 'IN'; // Replace with the desired country ISO code
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${shopifyStorefrontUrl}/admin/api/2023-04/countries/${countryIsoCode}.json`,
      headers: {
        'X-Shopify-Storefront-Access-Token': token,
        'Access-Control-Origin': '*',
        'Content-Type': 'application/json',
      },
      // data: query,
    };
    fetch(
      `${shopifyStorefrontUrl}/admin/api/2021-09/countries/${countryIsoCode}.json`,
      {
        headers: {
          'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
        },
      },
    )
      .then(res => {
        console.log(res);
      })
      .then(data => {
        console.log(data);
      })
      .catch(eerr => console.log(eerr));
  };
}
export default Shopify;
