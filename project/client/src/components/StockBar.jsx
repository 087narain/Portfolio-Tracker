function StockBar({ open, low, high, price }) {
  if ([low, high, open, price].some(v => typeof v !== 'number' || isNaN(v))) return null;
  if (high <= low) return null;

  const range = high - low;
  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  const openPos = clamp(((open - low) / range) * 100, 0, 100);
  const pricePos = clamp(((price - low) / range) * 100, 0, 100);

  // Ensure pricePos is not less than openPos for the fill width calculation
  const fillStart = Math.min(openPos, pricePos);
  const fillWidth = Math.abs(pricePos - openPos);

  return (
    <div className="relative flex items-center space-x-3">
      {/* Labels */}
      <div className="flex flex-col justify-between h-64 text-xs text-gray-700 dark:text-gray-300 font-mono">
        <span>{high.toFixed(2)}</span>
        <span>{((high + low) / 2).toFixed(2)}</span>
        <span>{low.toFixed(2)}</span>
      </div>

      {/* Vertical bar container */}
      <div className="relative w-6 h-64 bg-gray-300 dark:bg-darkBlue3 rounded">
        {/* Full vertical bar */}
        <div className="absolute inset-0 bg-gray-400 dark:bg-darkBlue4 rounded" />

        {/* Current Price Line */}
        <div
          className="absolute left-0 right-0 h-[2px] bg-red-500"
          style={{ bottom: `${pricePos}%`, transform: 'translateY(50%)' }}
          title={`Current Price: ${price}`}
        />
        
        {/* Open Price Line */}
        <div
          className="absolute left-0 right-0 h-[2px] bg-accentBlue"
          style={{ bottom: `${openPos}%`, transform: 'translateY(50%)' }}
          title={`Open Price: ${open}`}
        />
      </div>

      {/* Line labels */}
      <div className="flex flex-col justify-between h-64 text-xs font-semibold">
        {/* For better vertical alignment, use padding/margin */}
        <div style={{ height: `${100 - pricePos}%` }} />
        <span className="text-red-500">Price: {price.toFixed(2)}</span>
        <div style={{ height: `${pricePos - openPos}%` }} />
        <span className="text-accentBlue">Open: {open.toFixed(2)}</span>
        <div style={{ height: `${openPos}%` }} />
      </div>
    </div>
  );
}
export default StockBar;