package com.narain.portfoliotracker.model;

import java.time.LocalDateTime;

public class ETF extends Asset {
    private String benchmarkIndex;
    private double expenseRatio;
    private double dividendYield;
    private String provider;

    public ETF(String ticker, int quantity, double purchasePrice, LocalDateTime purchaseTime, String currency,String benchmarkIndex, double expenseRatio, double dividendYield, String provider) {
        super(ticker, quantity, purchasePrice, purchaseTime, currency);
        this.benchmarkIndex = benchmarkIndex;
        this.expenseRatio = expenseRatio;
        this.dividendYield = dividendYield;
        this.provider = provider;
    }

    @Override
    public double getCurrentValue() {
        
    }

}

