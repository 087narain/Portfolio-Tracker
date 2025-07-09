package com.narain.portfoliotracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.narain.portfoliotracker.model.Asset;

@Service
public class PortfolioService {

    @Autowired
    private MarketDataService marketDataService;

    public double getLiveValue(Asset asset) {
        double currentPrice = marketDataService.getCurrentPrice(asset.getTicker());
        return asset.getQuantity() * currentPrice;
    }
}