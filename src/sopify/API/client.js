import Client from 'shopify-buy';
//import { Shopify } from '@shopify/shopify-api';
//let storefrontAccessToken = 'd099c1a3a200a215e22a93f50d551938'
export const client = Client.buildClient({
  domain: 'wholespoon-india.myshopify.com',
  storefrontAccessToken: 'd099c1a3a200a215e22a93f50d551938',
});
//mongodb/brew/mongodb-community

// export const client2 = new Shopify.clients.Storefront({
//   domain: 'wholespoon-india.myshopify.com',
//   storefrontAccessToken

// });