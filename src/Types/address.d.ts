export interface Address {
    data: Data
  }
  
  export interface Data {
    customerAddressCreate: CustomerAddressCreate
    customerAddressDelete:CustomerAddressDelete
    customerAddressUpdate:CustomerAddressUpdate
    customerDefaultAddressUpdate:CustomerDefaultAddressUpdate
  }
  export interface CustomerDefaultAddressUpdate {
    customer: Customer
    customerUserErrors: any[]
  }
  export interface CustomerAddressUpdate {
    customerAddress: CustomerAddress
    customerUserErrors: any[]
  }
  export interface CustomerAddressDelete {
    customerUserErrors: any[]
    deletedCustomerAddressId: string
  }
  
  export interface CustomerAddressCreate {
    customerAddress: CustomerAddress
    customerUserErrors: any[]
  }
  
  export interface CustomerAddress {
    address1: string
    address2: string
    city: string
    company: string
    countryCodeV2: string
    firstName: string
    lastName: string
  }
  