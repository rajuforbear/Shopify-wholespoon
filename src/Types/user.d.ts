export interface user {
    data: Data
  }
  
  export interface Data {
    customer: Customer
  }
  
  export interface Customer {
    firstName: string
    lastName: string
    id:string
    email: string
    phone: string
    acceptsMarketing: boolean
    createdAt: string
    numberOfOrders: string
    defaultAddress: DefaultAddress
    addresses: Addresses
    orders: Orders
  }
  
  export interface DefaultAddress {
    address1: string
    address2: string
    city: string
    company: string
    country: string
    countryCodeV2: string
    firstName: string
    formatted: string[]
    formattedArea: string
    id: string
    lastName: string
    latitude: any
    longitude: any
    zip: string
    provinceCode: string
    province: string
    phone: string
    name: string
  }
  
  export interface Addresses {
    nodes: Node[]
    edges: Edge[]
  }
  
  export interface Node {
    address1: string
    address2: string
    city: string
    company: string
    country: string
    countryCodeV2: string
    firstName: string
    formatted: string[]
    formattedArea: string
    id: string
    lastName: string
    latitude: any
    longitude: any
    zip: string
    provinceCode: string
    province: string
    phone: string
    name: string
  }
  
  export interface Edge {
    cursor: string
    node: Node2
  }
  
  export interface Node2 {
    address1: string
    address2: string
    city: string
    company: string
    country: string
    countryCodeV2: string
    firstName: string
    formatted: string[]
    formattedArea: string
    id: string
    lastName: string
    latitude: any
    longitude: any
    zip: string
    provinceCode: string
    province: string
    phone: string
    name: string
  }
  
  export interface Orders {
    edges: any[]
    nodes: any[]
  }
  