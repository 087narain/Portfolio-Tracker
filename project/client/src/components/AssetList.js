export default function AssetList({ assets }) {

  if (!assets || assets.length === 0) {
    return (
      <div className="text-gray-500 dark:text-gray-400 text-center mt-4">
        No assets found. Please add some assets to your portfolio.
      </div>
    );
  }

  return (
    <div className="text-gray-900 dark:text-white">
      <h3 className="text-xl text-center font-semibold mt-4">Assets</h3>
      <ul className="divide-y divide-gray-300 dark:divide-gray-700 mt-2">
        {assets.map((asset, index) => (
          <li
            key={index}
            className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-gray-50 dark:bg-darkBlue2 rounded-lg px-4"
          >
            {/* Left: Ticker and quantity */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">{asset.ticker}</span>
              <span className="text-gray-500 dark:text-gray-400">–</span>
              <span className="text-sm">
                <span className="font-bold">{asset.quantity}</span> shares at
                <span className="font-bold"> {asset.purchasePrice.toFixed(2)}</span> USD each
              </span>
            </div>

            {/* Right: Total value */}
            <div className="font-semibold text-accentBlue dark:text-accentGreen">
              Total: {(asset.quantity * asset.purchasePrice).toFixed(2)} USD
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}