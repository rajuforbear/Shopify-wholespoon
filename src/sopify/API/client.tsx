import Client from 'shopify-buy';
import {token} from '../Constants';

export const client = Client.buildClient({
  domain: "wholespoon-india.myshopify.com",
  storefrontAccessToken: 'd099c1a3a200a215e22a93f50d551938',
  apiVersion:'2023-04'
});
