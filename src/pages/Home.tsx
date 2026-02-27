import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiFire, HiTrendingUp, HiArrowUp, HiArrowDown } from 'react-icons/hi'
import { useMarketCoins, useTrendingCoins, useTopGainers } from '../hooks'

const Home = () => {
  const [page, setPage] = useState(1)
  const { data: coins, isLoading } = useMarketCoins(page)
  const { data: trending } = useTrendingCoins()
  const { data: gainers } = useTopGainers()
  return (
    <main className="max-w-full mx-auto px-4 py-8">
      {/* Trending & Top Gainers */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <HiFire className="text-orange-500 w-5 h-5" />
            Trending
          </h2>
          <div className="space-y-3">
            {trending?.map((coin) => (
              <Link
                key={coin.id}
                to={`/coin/${coin.id}`}
                className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={coin.image}
                    alt={coin.label}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-white font-medium">{coin.label}</p>
                    <p className="text-gray-400 text-sm">{coin.symbol}</p>
                  </div>
                </div>
                {coin.priceChangePercentage !== undefined && (
                  <span
                    className={`text-sm font-medium flex items-center gap-1 ${coin.priceChangePercentage >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {coin.priceChangePercentage >= 0 ? (
                      <HiArrowUp className="w-4 h-4" />
                    ) : (
                      <HiArrowDown className="w-4 h-4" />
                    )}
                    {Math.abs(coin.priceChangePercentage).toFixed(2)}%
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <HiTrendingUp className="text-green-500 w-5 h-5" />
            Top Gainers
          </h2>
          <div className="space-y-3">
            {gainers?.map((coin) => (
              <Link
                key={coin.id}
                to={`/coin/${coin.id}`}
                className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={coin.image}
                    alt={coin.label}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-white font-medium">{coin.label}</p>
                    <p className="text-gray-400 text-sm">
                      ${coin.currentPrice?.toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                  <HiArrowUp className="w-4 h-4" />
                  {coin.priceChangePercentage?.toFixed(2)}%
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* All Coins Table */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-gray-400 text-sm font-medium">
                  #
                </th>
                <th className="px-6 py-4 text-left text-gray-400 text-sm font-medium">
                  Coin
                </th>
                <th className="px-6 py-4 text-right text-gray-400 text-sm font-medium">
                  Price
                </th>
                <th className="px-6 py-4 text-right text-gray-400 text-sm font-medium">
                  24h %
                </th>
                <th className="px-6 py-4 text-right text-gray-400 text-sm font-medium">
                  Market Cap
                </th>
                <th className="px-6 py-4 text-right text-gray-400 text-sm font-medium">
                  Volume
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? [...Array(5)].map((_, i) => (
                    <tr key={i} className="border-t border-gray-700">
                      <td colSpan={6} className="px-6 py-4">
                        <div className="h-12 bg-gray-700 rounded animate-pulse" />
                      </td>
                    </tr>
                  ))
                : coins?.map((coin, idx) => (
                    <tr
                      key={coin.id}
                      className="border-t border-gray-700 hover:bg-gray-700 transition"
                    >
                      <td className="px-6 py-4 text-gray-400">
                        {(page - 1) * 20 + idx + 1}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/coin/${coin.id}`}
                          className="flex items-center gap-3"
                        >
                          <img
                            src={coin.image}
                            alt={coin.label}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="text-white font-medium">
                              {coin.label}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {coin.symbol}
                            </p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-right text-white font-medium">
                        ${coin.currentPrice?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={`font-medium inline-flex items-center gap-1 justify-end ${coin.priceChangePercentage! >= 0 ? "text-green-400" : "text-red-400"}`}
                        >
                          {coin.priceChangePercentage! >= 0 ? (
                            <HiArrowUp className="w-4 h-4" />
                          ) : (
                            <HiArrowDown className="w-4 h-4" />
                          )}
                          {Math.abs(coin.priceChangePercentage!).toFixed(2)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-300">
                        ${(coin.marketCap! / 1e9).toFixed(2)}B
                      </td>
                      <td className="px-6 py-4 text-right text-gray-300">
                        ${(coin.volume24h! / 1e6).toFixed(2)}M
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 p-4 border-t border-gray-700">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Prev
          </button>
          {[...Array(5)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-10 h-10 rounded-lg font-medium ${page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-400 hover:bg-gray-600"}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === 5}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
