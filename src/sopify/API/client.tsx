import Client from 'shopify-buy';
import {token} from '../Constants';
//import Shopify from 'shopify-api-node';

//import { Shopify } from '@shopify/shopify-api';
//let storefrontAccessToken = 'd099c1a3a200a215e22a93f50d551938'
export const client = Client.buildClient({
  domain: 'wholespoon-india.myshopify.com',
  storefrontAccessToken: 'd099c1a3a200a215e22a93f50d551938',
});

// export const shopify = new Shopify({
//   accessToken: 'd099c1a3a200a215e22a93f50d551938',
//   shopName: 'wholespoon-india.myshopify.com',
// });
