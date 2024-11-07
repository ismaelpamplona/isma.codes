export type Holding = {
  amount: number
  added_date: string
}

export type Asset = {
  asset_id: string
  name: string
  symbol: string
  holdings: Holding[]
}

export type MetaData = {
  secondary: string
  notes: string
}

export type Wallet = {
  id: string
  created_at: string
  name: string
  assets: Asset[]
  meta: MetaData
}
