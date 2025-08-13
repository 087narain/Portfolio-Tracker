export default function PortfolioSummary({ portfolioName, totalValue, currency }) {
    if (totalValue == null) return <div>Loading...</div>;

    return (
        <div className="w-full  bg-gray-100 dark:bg-darkBlue2 shadow-md rounded-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-3 text-black text-center dark:text-accentBlue">Total value for: {portfolioName}</h2>
            <p className="text-lg text-center text-black bg-center dark:text-accentBlue mb-4 flex items-center justify-center">
                <span>💰</span>
                <span className="font-bold text-xl ml-2">{totalValue.toFixed(2)} {currency}</span>
            </p>
        </div>
    );
}