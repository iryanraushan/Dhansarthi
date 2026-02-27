import { Link } from 'react-router-dom'
import PriceChart from '../components/ui/PriceChart'
import { HiRefresh, HiChartBar, HiArrowUp, HiArrowDown, HiFire, HiArrowLeft } from 'react-icons/hi'
import { useCoin } from '../hooks'

const HISTORICAL_PERIODS = [
  { label: '1D', value: 1 },
  { label: '7D', value: 7 },
  { label: '1M', value: 30 },
  { label: '3M', value: 90 },
  { label: '6M', value: 180 },
  { label: '1Y', value: 365 },
  { label: '5Y', value: 1825 }
]

const CoinDetail = () => {
  const {
    coin, isLoading, refetch, trending, gainers, historyLoading, connected,
    aboutExpanded, setAboutExpanded, chartMode, setChartMode, days, setDays,
    priceRange, chartData, priceChange, displayPrice, displayChange
  } = useCoin()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!coin) return null

  return (
    <main className="flex-1 px-4 py-4">
        <Link to="/" className="text-blue-400 hover:text-blue-300 mb-3 inline-flex items-center gap-1">
          <HiArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <div className="grid lg:grid-cols-3 gap-4 lg:h-[calc(100vh-8rem)]">
          
          <div className="lg:col-span-2 h-125 lg:h-full order-1 lg:order-2">
            
            <div className="bg-gray-800 rounded-xl p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-lg font-semibold">Price Chart</h2>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setChartMode('live')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                      chartMode === 'live' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    Live
                  </button>
                  <button
                    onClick={() => setChartMode('historical')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                      chartMode === 'historical' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    Historical
                  </button>
                </div>
              </div>

              {chartMode === 'historical' && (
                <div className="flex gap-2 mb-4 flex-wrap">
                  {HISTORICAL_PERIODS.map(period => (
                    <button
                      key={period.value}
                      onClick={() => setDays(period.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        days === period.value ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                      }`}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>
              )}
              
              {chartMode === 'historical' && historyLoading ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : chartData.length > 0 ? (
                <div className="flex-1 min-h-0">
                  <PriceChart 
                    data={chartData} 
                    symbol={coin.symbol} 
                    priceRange={priceRange}
                    isPositive={priceChange >= 0}
                  />
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400">
                  {'Loading...'}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col gap-4 lg:overflow-y-auto lg:h-full scrollbar-hide order-2 lg:order-1">
            
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-700">
                <div className="flex items-start gap-3">
                  <img src={coin.image} alt={coin.label} className="w-12 h-12 rounded-full" />
                  <div>
                    <h1 className="text-white text-lg font-bold">{coin.label}</h1>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-gray-400 text-sm">{coin.symbol}</span>
                      {connected && (
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end mb-1">
                    <p className="text-white text-xl font-bold">${displayPrice.toLocaleString()}</p>
                    <button
                      onClick={() => refetch()}
                      className="p-1 bg-gray-700 hover:bg-gray-600 rounded transition"
                      title="Refresh"
                    >
                      <HiRefresh className="w-3.5 h-3.5 text-gray-300" />
                    </button>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded inline-flex items-center gap-1 ${
                    displayChange >= 0 ? 'text-green-400 bg-green-900/30' : 'text-red-400 bg-red-900/30'
                  }`}>
                    {displayChange >= 0 ? <HiArrowUp className="w-3 h-3" /> : <HiArrowDown className="w-3 h-3" />} {Math.abs(displayChange).toFixed(2)}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Market Cap</p>
                  <p className="text-white text-sm font-semibold">${(coin.marketCap! / 1e9).toFixed(2)}B</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">24h Volume</p>
                  <p className="text-white text-sm font-semibold">${(coin.volume24h! / 1e9).toFixed(2)}B</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">24h High</p>
                  <p className="text-white text-sm font-semibold">${coin.high24h?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">24h Low</p>
                  <p className="text-white text-sm font-semibold">${coin.low24h?.toLocaleString()}</p>
                </div>
                {coin.circulatingSupply && (
                  <div className="col-span-2">
                    <p className="text-gray-400 text-xs mb-1">Circulating Supply</p>
                    <p className="text-white text-sm font-semibold">{(coin.circulatingSupply / 1e6).toFixed(2)}M {coin.symbol}</p>
                  </div>
                )}
              </div>
            </div>

            {coin.description && (
              <div 
                className="bg-gray-800 rounded-xl p-6 cursor-pointer hover:bg-gray-750 transition"
                onClick={() => setAboutExpanded(!aboutExpanded)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-white font-semibold">About {coin.label}</h2>
                  <span className="text-gray-400 text-xs">{aboutExpanded ? 'View Less' : 'View More'}</span>
                </div>
                <div 
                  className={`text-gray-300 text-sm leading-relaxed ${aboutExpanded ? '' : 'line-clamp-3'}`}
                  dangerouslySetInnerHTML={{ __html: aboutExpanded ? coin.description : coin.description.slice(0, 200) + '...' }}
                />
              </div>
            )}

            <div className="bg-gray-800 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <HiFire className="w-5 h-5 text-orange-500" />
                Trending
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {trending?.slice(0, 6).map(c => (
                  <Link
                    key={c.id}
                    to={`/coin/${c.id}`}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-700 transition"
                  >
                    <img src={c.image} alt={c.label} className="w-10 h-10 rounded-full" />
                    <p className="text-white text-xs font-medium text-center">{c.symbol}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <HiChartBar className="w-5 h-5 text-green-500" />
                Top Gainers
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {gainers?.slice(0, 6).map(c => (
                  <Link
                    key={c.id}
                    to={`/coin/${c.id}`}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-700 transition"
                  >
                    <img src={c.image} alt={c.label} className="w-10 h-10 rounded-full" />
                    <p className="text-white text-xs font-medium text-center">{c.symbol}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
  )
}

export default CoinDetail
