export interface PricePoint {
  time: string
  price: number
}

export interface CryptoAsset {
  id: string
  label: string
  symbol: string
  binanceSymbol: string
  image?: string
  currentPrice?: number
  priceChangePercentage?: number
  marketCap?: number
  volume24h?: number
  high24h?: number
  low24h?: number
  circulatingSupply?: number
}

export interface CoinDetail extends CryptoAsset {
  description?: string
  marketCapRank?: number
  ath?: number
  atl?: number
}