export default function PortfolioSummary({ portfolioName, totalValue }) {
    if (totalValue == null) return <div>Loading...</div>;

    return (
        <div className="w-full max-w-xl bg-darkBlue2 shadow-md rounded-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-3 text-accentBlue">Total value for: {portfolioName}</h2>
          <p className="text-lg mb-4 flex items-center">
            <span>💰</span>
            <span className="font-bold text-xl ml-2">{totalValue.toFixed(2)} USD</span>
          </p>
        </div>
    );
}