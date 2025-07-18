export default function PortfolioSummary({ portfolioName, totalValue }) {
    return(
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between p-6">
            <h2 className="text-xl font-bold mb-2">Total value for: {portfolioName}</h2>
            <p className="text-lg mb-4"> 💰 <span className="font-bold">${totalValue.toFixed(2)}</span></p>
        </div>
    );
}