export interface HomeData {
    asset: Asset
  }
  
  export interface Asset {
    key: string
    public_url: any
    value: string
    created_at: string
    updated_at: string
    content_type: string
    size: number
    checksum: string
    theme_id: number
    warnings: any[]
  }
  