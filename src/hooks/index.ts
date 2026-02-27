import { useState, useEffect, useMemo, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchTopCoins, fetchTrendingCoins, fetchTopGainers, fetchCoinDetail, fetchHistoricalData } from '../services/coingecko'
import type { PricePoint } from '../types'

export const useMarketCoins = (page: number) => {
  return useQuery({
    queryKey: ['coins', page],
    queryFn: () => fetchTopCoins(page),
    staleTime: 60000,
  })
}

export const useTrendingCoins = () => {
  return useQuery({
    queryKey: ['trending'],
    queryFn: fetchTrendingCoins,
    staleTime: 300000,
  })
}

export const useTopGainers = () => {
  return useQuery({
    queryKey: ['gainers'],
    queryFn: fetchTopGainers,
    staleTime: 300000,
  })
}

export const useCoinInfo = (coinId: string | undefined) => {
  return useQuery({
    queryKey: ['coin', coinId],
    queryFn: () => fetchCoinDetail(coinId!),
    enabled: !!coinId,
    refetchInterval: 30000
  })
}

export const usePriceHistory = (coinId: string | undefined, days: number, enabled: boolean) => {
  return useQuery({
    queryKey: ['history', coinId, days],
    queryFn: () => fetchHistoricalData(coinId!, days),
    enabled: !!coinId && enabled
  })
}

export const useLivePrice = (symbol: string) => {
  const [price, setPrice] = useState<number | null>(null)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    if (!symbol) return

    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`)
    
    ws.onopen = () => setConnected(true)
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setPrice(parseFloat(data.p))
    }
    ws.onerror = () => setConnected(false)
    ws.onclose = () => setConnected(false)

    return () => ws.close()
  }, [symbol])

  return { price, connected }
}

export const useCoin = () => {
  const { coinId } = useParams<{ coinId: string }>()
  const [liveData, setLiveData] = useState<PricePoint[]>([])
  const [aboutExpanded, setAboutExpanded] = useState(false)
  const [chartMode, setChartMode] = useState<'live' | 'historical'>('live')
  const [days, setDays] = useState(7)
  const lastPriceRef = useRef<number>(0)

  const { data: coin, isLoading, refetch } = useCoinInfo(coinId)
  const { data: trending } = useTrendingCoins()
  const { data: gainers } = useTopGainers()
  const { data: history, isLoading: historyLoading } = usePriceHistory(coinId, days, chartMode === 'historical')
  const { price: livePrice, connected } = useLivePrice(coin?.binanceSymbol || '')

  useEffect(() => {
    if (livePrice && livePrice !== lastPriceRef.current) {
      lastPriceRef.current = livePrice
      const now = Date.now()
      setLiveData(prev => {
        const newData = [...prev, {
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          price: livePrice,
          timestamp: now
        }]
        return newData.filter(d => (d as any).timestamp > now - 86400000)
      })
    }
  }, [livePrice])

  const priceRange = useMemo(() => {
    if (liveData.length === 0) return { min: 0, max: 0 }
    const prices = liveData.map(d => d.price)
    const min = Math.min(...prices)
    const max = Math.max(...prices)
    const padding = (max - min) * 0.05 || 1
    return { min: min - padding, max: max + padding }
  }, [liveData])

  const priceChange = useMemo(() => {
    const data = chartMode === 'live' ? liveData : history
    if (!data || data.length < 2) return 0
    return ((data[data.length - 1].price - data[0].price) / data[0].price) * 100
  }, [liveData, history, chartMode])

  const chartData = chartMode === 'live' ? liveData : (history || [])
  const displayPrice = livePrice || coin?.currentPrice || 0
  const displayChange = liveData.length > 1 ? priceChange : coin?.priceChangePercentage || 0

  return {
    coin, isLoading, refetch, trending, gainers, historyLoading, connected,
    aboutExpanded, setAboutExpanded, chartMode, setChartMode, days, setDays,
    priceRange, chartData, priceChange, displayPrice, displayChange
  }
}
