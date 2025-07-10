package com.narain.portfoliotracker.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class Portfolio {
    private String portfolioName;
    private UUID userId;
    private List<Asset> assets;
    private LocalDateTime creationDate;
    private double totalValue;
    private Map<String, Double> assetTypeBreakdown;
    private double balance;
    private String currency;


    public Portfolio(String portfolioName, LocalDateTime creationDate, double totalValue, double balance, String currency) {
        this.portfolioName = portfolioName;
        this.userId = UUID.randomUUID();
        this.assets = new ArrayList<>();
        this.creationDate = creationDate;
        this.totalValue = totalValue;
        this.assetTypeBreakdown = new HashMap<>();
        this.balance = balance;
        this.currency = currency;
    }

    public String getPortflioName() { return this.portfolioName; }
    public void setPortfolioName(String portfolioName) { this.portfolioName = portfolioName; }

    public UUID 

}
