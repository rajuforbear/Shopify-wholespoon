import Client from 'shopify-buy';
import {token} from '../Constants';

export const client = Client.buildClient({
  domain: 'mystore123432.myshopify.com',
  storefrontAccessToken: token,
  apiVersion: '2023-07',
});
