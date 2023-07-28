import Client from 'shopify-buy';
import {token} from '../Constants';

export const client = Client.buildClient({
  domain: "wholespoon-india.myshopify.com",
  storefrontAccessToken:token,
  apiVersion:'2023-04'
});
