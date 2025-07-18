export default function AssetList({ assets }) {
    return (
        <div>
            <h3 className='text-lg font-semibold mt-4'>Assets:</h3>
            <ul className="divide-y divide-gray-200 mt-2">
              {assets.map((asset, index) => (
                <li key={index} className="py-2 flex gap-2">
                  <span className='font-bold'>{asset.ticker}</span> 
                  <span className="text-gray-600">–</span>
                  <span>
                    <span className="font-bold">{asset.quantity}</span> shares at  
                    <span className="font-bold"> {asset.purchasePrice.toFixed(2)}</span> USD each
                  </span>
                </li>
              ))}
            </ul>
        </div>
    );
}