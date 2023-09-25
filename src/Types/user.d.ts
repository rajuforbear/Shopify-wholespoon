export interface user {
  data: Data
  errors: Error[]
}

export interface Data {
  customer: Customer
}

export interface Customer {
  firstName: string
  id: string
  lastName: string
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
  edges: Edge2[]
}

export interface Edge2 {
  node: Node3
}

export interface Node3 {
  billingAddress: BillingAddress
  canceledAt: any
  cancelReason: any
  currencyCode: string
  currentSubtotalPrice: CurrentSubtotalPrice
  currentTotalDuties: any
  currentTotalPrice: CurrentTotalPrice
  currentTotalTax: CurrentTotalTax
  customAttributes: CustomAttribute[]
  customerLocale: string
  customerUrl: string
  discountApplications: DiscountApplications
  edited: boolean
  email: string
  financialStatus: string
  fulfillmentStatus: string
  id: string
  lineItems: LineItems
  name: string
  orderNumber: number
  originalTotalDuties: OriginalTotalDuties
  originalTotalPrice: OriginalTotalPrice2
  phone?: string
  processedAt: string
  shippingAddress: ShippingAddress
  shippingDiscountAllocations: any[]
  statusUrl: string
  subtotalPrice: SubtotalPrice
  successfulFulfillments?: any[]
  totalPrice: TotalPrice
  totalRefunded: TotalRefunded
  totalShippingPrice: TotalShippingPrice
  totalTax: TotalTax
}

export interface BillingAddress {
  address1: string
  address2?: string
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

export interface CurrentSubtotalPrice {
  amount: string
  currencyCode: string
}

export interface CurrentTotalPrice {
  amount: string
  currencyCode: string
}

export interface CurrentTotalTax {
  amount: string
  currencyCode: string
}

export interface CustomAttribute {
  key: string
  value: string
}

export interface DiscountApplications {
  nodes: Node4[]
  pageInfo: PageInfo
}

export interface Node4 {
  __typename: string
  allocationMethod: string
  targetSelection: string
  targetType: string
  value: Value
}

export interface Value {
  __typename: string
}

export interface PageInfo {
  endCursor?: string
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor?: string
}

export interface LineItems {
  nodes: Node5[]
}

export interface Node5 {
  currentQuantity: number
  customAttributes: CustomAttribute2[]
  discountAllocations: DiscountAllocation[]
  discountedTotalPrice: DiscountedTotalPrice
  originalTotalPrice: OriginalTotalPrice
  quantity: number
  title: string
  variant: any
}

export interface CustomAttribute2 {
  key: string
  value: string
}

export interface DiscountAllocation {
  allocatedAmount: AllocatedAmount
  discountApplication: DiscountApplication
}

export interface AllocatedAmount {
  amount: string
  currencyCode: string
}

export interface DiscountApplication {
  __typename: string
  allocationMethod: string
  targetSelection: string
  targetType: string
  value: Value2
}

export interface Value2 {
  __typename: string
}

export interface DiscountedTotalPrice {
  amount: string
  currencyCode: string
}

export interface OriginalTotalPrice {
  amount: string
  currencyCode: string
}

export interface OriginalTotalDuties {
  amount: string
  currencyCode: string
}

export interface OriginalTotalPrice2 {
  amount: string
  currencyCode: string
}

export interface ShippingAddress {
  address1: string
  address2?: string
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
  name: string
  phone: string
  province: string
  provinceCode: string
  zip: string
}

export interface SubtotalPrice {
  amount: string
  currencyCode: string
}

export interface TotalPrice {
  amount: string
  currencyCode: string
}

export interface TotalRefunded {
  amount: string
  currencyCode: string
}

export interface TotalShippingPrice {
  amount: string
  currencyCode: string
}

export interface TotalTax {
  amount: string
  currencyCode: string
}

export interface Error {
  message: string
  locations: Location[]
  path: any[]
}

export interface Location {
  line: number
  column: number
}
