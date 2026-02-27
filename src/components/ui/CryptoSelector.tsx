import type { CryptoAsset } from '../../types'

interface Props {
  assets: CryptoAsset[]
  selectedAsset: string
  onSelect: (id: string) => void
  page: number
  onPageChange: (page: number) => void
  isLoading: boolean
}

const CryptoSelector = ({ assets, selectedAsset, onSelect, page, onPageChange, isLoading }: Props) => {
  return (
    <div className="bg-gray-800 rounded-xl p-4 mb-6">

      <div className="flex items-center justify-between mb-3">
        <h3 className="text-gray-400 text-sm">Select Asset</h3>
        <span className="text-gray-500 text-xs">Page {page}</span>
      </div>

      {/* Coin Grid */}
      {isLoading ? (
        <div className="flex flex-wrap gap-2">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-20 h-9 bg-gray-700 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {assets.map(asset => (
            <button
              key={asset.id}
              onClick={() => onSelect(asset.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedAsset === asset.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              {asset.image && (
                <img src={asset.image} alt={asset.label} className="w-4 h-4 rounded-full" />
              )}
              <span>{asset.symbol}</span>
            </button>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          ← Prev
        </button>

        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(p => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                page === p
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === 5}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          Next →
        </button>
      </div>

    </div>
  )
}

export default CryptoSelector