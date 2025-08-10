function ETFBar({ low, high, price }) {
    const range = high - low;
    const percentage = ((price - low) / range) * 100;
    const position = ((price - low) / range) * 100;
    const barStyle = {
        width: `${percentage}%`,
        backgroundColor: price > high ? 'red' : price < low ? 'green' : 'blue',
        height: '20px',
        borderRadius: '5px',
    };

    if (range <= 0) {
        return <p className="text-red-500">Insufficient price range for ETF Bar.</p>;
    }

    return(
        <div className="w-full bg-gray-300 dark:bg-darkBlue3 rounded-full h-4 relative mt-4">
            {/* Full range bar */}
            <div className="absolute top-0 left-0 h-4 w-full bg-gray-400 dark:bg-darkBlue2 rounded-full"></div>

            {/* Current price indicator */}
            <div
                className="absolute top-0 h-4 w-1 bg-accentGreen rounded-full"
                style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
                title={`Current Price: ${price}`}
            />
        </div>
    );
}