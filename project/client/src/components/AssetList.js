export default function AssetList({ assets }) {
    return (
        <div>
            <h3 className='text-xl font-semibold mt-4'>Assets:</h3>
            <ul className="divide-y divide-gray-200 mt-2">
              {assets.map((asset, index) => (
                <li key={index} className="py-2 flex gap-2">
                  <span className='font-bold text-lg'>{asset.ticker}</span> 
                  <span className="text-gray-600">–</span>
                  <span>
                    <div>
                        <span className="font-bold text-lg">{asset.quantity}</span> shares at  
                        <span className="font-bold"> {asset.purchasePrice.toFixed(2)}</span> USD each. 
                    </div>
                    <div>
                        <span className="font-semibold text-blue-600 ml-1">
                            Total: {(asset.quantity * asset.purchasePrice).toFixed(2)} USD
                        </span>
                    </div>
                  </span>
                </li>
              ))}
            </ul>
        </div>
    );
}