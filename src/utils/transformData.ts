import type { PricePoint } from "../types"

export const transformChartData = (
  prices: [number, number][],
  days: number
): PricePoint[] => {
  return prices.map(([timestamp, price]) => ({
    time: new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: days === 1 ? '2-digit' : undefined,
      minute: days === 1 ? '2-digit' : undefined
    }),
    price: parseFloat(price.toFixed(2))
  }))
}