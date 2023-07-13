export interface CartItem {
    data: Data
  }
  
  export interface Data {
    cartCreate: CartCreate,
    cartLinesAdd:CartCreate
    cartLinesRemove:CartCreate
    cart:Cart
    cartLinesUpdate:CartCreate
  }
  
  export interface CartCreate {
    cart: Cart
  }
  
  export interface Cart {
    id: string
    checkoutUrl: string
    cost: Cost
    createdAt: string
    updatedAt: string
    lines: Lines
    buyerIdentity: BuyerIdentity
    attributes: Attribute[]
  }
  
  export interface Cost {
    checkoutChargeAmount: CheckoutChargeAmount
    subtotalAmount: SubtotalAmount
    subtotalAmountEstimated: boolean
    totalAmount: TotalAmount
    totalAmountEstimated: boolean
    totalDutyAmount: any
    totalDutyAmountEstimated: boolean
    totalTaxAmount: any
    totalTaxAmountEstimated: boolean
  }
  
  export interface CheckoutChargeAmount {
    amount: string
    currencyCode: string
  }
  
  export interface SubtotalAmount {
    amount: string
    currencyCode: string
  }
  
  export interface TotalAmount {
    amount: string
    currencyCode: string
  }
  
  export interface Lines {
    edges: Edge[]
  }
  
  export interface Edge {
    node: Node
  }
  
  export interface Node {
    id: string
    merchandise: Merchandise,
    quantity:number
  }
  
  export interface Merchandise {
    id: string,
    product:Product
  }
  export interface Product {
    title: string
    sellingPlanGroups: SellingPlanGroups
    priceRange: PriceRange
    availableForSale: boolean
    featuredImage: FeaturedImage
    images: Images
  }
  
  export interface BuyerIdentity {
    deliveryAddressPreferences: any[]
  }
  
  export interface Attribute {
    key: string
    value: string
  }
  