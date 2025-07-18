package com.narain.portfoliotracker.service;

import java.util.HashMap;
import java.util.Map;

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
            totalValue += asset.getCurrentValue();
        }
        return totalValue + portfolio.getBalance();
    }

    public double getPortfolioLiveValue(Portfolio portfolio) {
        double totalValue = 0.0;
        for (Asset asset : portfolio.getAllAssets()) {
            totalValue += getLiveValue(asset);
        }
        return totalValue + portfolio.getBalance();
    }

    public double getPortfolioValueByType(Portfolio portfolio, String assetType) {
        double totalValue = 0.0;
        for (Asset asset : portfolio.getAllAssets()) {
            if (asset.getType().equals(assetType)) {
                totalValue += asset.getCurrentValue();
            }
        }
        return totalValue;
    }

    public Asset getAssetByTicker(Portfolio portfolio, String ticker) {
        return portfolio.getAssetByTicker(ticker);
    }

    public void addAssetToPortfolio(Portfolio portfolio, Asset asset) {
        if (portfolio.containsAsset(asset.getTicker())) {
            Asset existingAsset = portfolio.getAssetByTicker(asset.getTicker());
            existingAsset.setQuantity(existingAsset.getQuantity() + asset.getQuantity());
            existingAsset.setPurchasePrice((existingAsset.getPurchasePrice() + asset.getPurchasePrice()) / 2);
        } else {
            portfolio.addAsset(asset);
        }
    }

    public boolean removeAssetFromPortfolio(Portfolio portfolio, String ticker) {
        Asset asset = portfolio.getAssetByTicker(ticker);
        if (asset != null) {
            portfolio.getAllAssets().remove(asset);
            return true;
        }

        return false;
    }

    public Map<String, Double> getAssetValuesByType(Portfolio portfolio) {
        Map<String, Double> assetValues = new HashMap<>();
        for (Asset asset : portfolio.getAllAssets()) {
            String type = asset.getType();
            double value = asset.getCurrentValue();
            assetValues.put(type, assetValues.getOrDefault(type, 0.0) + value);
        }
        return assetValues;
    }
}