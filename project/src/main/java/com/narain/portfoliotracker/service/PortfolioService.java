package com.narain.portfoliotracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.narain.portfoliotracker.model.Asset;
import com.narain.portfoliotracker.model.Portfolio;

@Service
public class PortfolioService {

    @Autowired
    private MarketDataService marketDataService;

    public double getLiveValue(Asset asset) {
        double currentPrice = marketDataService.getCurrentPrice(asset.getTicker());
        return asset.getQuantity() * currentPrice;
    }

    public double getTotalPortfolioValue(Portfolio portfolio) {
        double totalValue = 0.0;
        for (Asset asset : portfolio.getAllAssets()) {
            totalValue += getLiveValue(asset);
        }
        return totalValue + portfolio.getBalance();
    }
}