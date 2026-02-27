import type { PricePoint, CryptoAsset, CoinDetail } from '../types'
import { transformChartData } from '../utils/transformData'

const BASE_URL = 'https://api.coingecko.com/api/v3'

export const fetchTopCoins = async (page: number = 1): Promise<CryptoAsset[]> => {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}`
  )
  if (!res.ok) throw new Error('Failed to fetch coins')
  const data = await res.json()
  return data.map((coin: any) => ({
    id: coin.id,
    label: coin.name,
    symbol: coin.symbol.toUpperCase(),
    binanceSymbol: `${coin.symbol.toLowerCase()}usdt`,
    image: coin.image,
    currentPrice: coin.current_price,
    priceChangePercentage: coin.price_change_percentage_24h,
    marketCap: coin.market_cap,
    volume24h: coin.total_volume,
    high24h: coin.high_24h,
    low24h: coin.low_24h
  }))
}

export const fetchTrendingCoins = async (): Promise<CryptoAsset[]> => {
  const res = await fetch(`${BASE_URL}/search/trending`)
  if (!res.ok) throw new Error('Failed to fetch trending')
  const data = await res.json()
  return data.coins.slice(0, 6).map((item: any) => ({
    id: item.item.id,
    label: item.item.name,
    symbol: item.item.symbol.toUpperCase(),
    binanceSymbol: `${item.item.symbol.toLowerCase()}usdt`,
    image: item.item.small,
    currentPrice: item.item.data?.price,
    priceChangePercentage: item.item.data?.price_change_percentage_24h?.usd
  }))
}

export const fetchTopGainers = async (): Promise<CryptoAsset[]> => {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=price_change_percentage_24h_desc&per_page=6&page=1`
  )
  if (!res.ok) throw new Error('Failed to fetch top gainers')
  const data = await res.json()
  return data.map((coin: any) => ({
    id: coin.id,
    label: coin.name,
    symbol: coin.symbol.toUpperCase(),
    binanceSymbol: `${coin.symbol.toLowerCase()}usdt`,
    image: coin.image,
    currentPrice: coin.current_price,
    priceChangePercentage: coin.price_change_percentage_24h
  }))
}

export const fetchCoinDetail = async (coinId: string): Promise<CoinDetail> => {
  const res = await fetch(`${BASE_URL}/coins/${coinId}`)
  if (!res.ok) throw new Error('Failed to fetch coin detail')
  const coin = await res.json()
  return {
    id: coin.id,
    label: coin.name,
    symbol: coin.symbol.toUpperCase(),
    binanceSymbol: `${coin.symbol.toLowerCase()}usdt`,
    image: coin.image?.large,
    currentPrice: coin.market_data?.current_price?.usd,
    priceChangePercentage: coin.market_data?.price_change_percentage_24h,
    marketCap: coin.market_data?.market_cap?.usd,
    volume24h: coin.market_data?.total_volume?.usd,
    high24h: coin.market_data?.high_24h?.usd,
    low24h: coin.market_data?.low_24h?.usd,
    circulatingSupply: coin.market_data?.circulating_supply,
    description: coin.description?.en,
    marketCapRank: coin.market_cap_rank,
    ath: coin.market_data?.ath?.usd,
    atl: coin.market_data?.atl?.usd
  }
}

export const fetchHistoricalData = async (
  assetId: string,
  days: number
): Promise<PricePoint[]> => {
  const res = await fetch(
    `${BASE_URL}/coins/${assetId}/market_chart?vs_currency=usd&days=${days}`
  )
  if (!res.ok) throw new Error('Failed to fetch pastData data')
  const data = await res.json()
  return transformChartData(data.prices, days)
}
