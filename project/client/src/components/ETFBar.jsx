function ETFBar({ open, low, high, price }) {
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
    <div className="relative w-full h-6 bg-gray-300 dark:bg-darkBlue3 rounded-full">
      {/* Full range bar */}
      <div className="absolute inset-0 bg-gray-400 dark:bg-darkBlue4 rounded-full" />

      {/* Filled portion between open and current price */}
      <div
        className="absolute top-0 bottom-0 bg-accentGreen rounded"
        style={{ left: `${fillStart}%`, width: `${fillWidth}%` }}
        title={`Price range between open (${open}) and current (${price})`}
      />

      {/* Open price marker */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-accentBlue rounded"
        style={{ left: `${openPos}%`, transform: 'translateX(-50%)' }}
        title={`Open: ${open}`}
      />

      {/* Current price marker */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-green-800 rounded"
        style={{ left: `${pricePos}%`, transform: 'translateX(-50%)' }}
        title={`Current: ${price}`}
      />
    </div>
  );
}
export default ETFBar;