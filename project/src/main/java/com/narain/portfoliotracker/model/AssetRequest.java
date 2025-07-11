package com.narain.portfoliotracker.model;

public class AssetRequest {
    private Portfolio portfolio;
    private Asset asset;

    public AssetRequest(Portfolio portfolio, Asset asset) {
        this.portfolio = portfolio;
        this.asset = asset;
    }

    public Portfolio getPortfolio() {
        return portfolio;
    }

    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }

    public Asset getAsset() {
        return asset;
    }

    public void setAsset(Asset asset) {
        this.asset = asset;
    }
}
