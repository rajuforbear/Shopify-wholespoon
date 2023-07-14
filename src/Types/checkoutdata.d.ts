export interface Checkouts {
    data: Data
  }
  
  export interface Data {
    checkoutCreate: CheckoutCreate
  }
  
  export interface CheckoutCreate {
    checkout: Checkout
    checkoutUserErrors: any[]
    queueToken: any
  }
  
  export interface Checkout {
    id: string
    lineItemsSubtotalPrice: LineItemsSubtotalPrice
    lineItems: LineItems
  }
  
  export interface LineItemsSubtotalPrice {
    amount: string
    currencyCode: string
  }
  
  export interface LineItems {
    edges: Edge[]
  }
  
  export interface Edge {
    node: Node
  }
  
  export interface Node {
    id: string
    quantity: number
    title: string
    variant: Variant
  }
  
  export interface Variant {
    id: string
    image: Image
    price: Price
  }
  
  export interface Image {
    id: string
    url: string
  }
  
  export interface Price {
    amount: string
    currencyCode: string
  }
  