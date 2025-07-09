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
        return quantity * purchasePrice;
    }

    @Override
    public String getType() {
        return "ETF";
    }

    public String getBenchmarkIndex() {
        return this.benchmarkIndex;
    }

    public void setBenchmarkIndex(String benchmarkIndex) {
        this.benchmarkIndex = benchmarkIndex;
    }

    public double getExpenseRatio() {
        return this.expenseRatio;
    }

    public void setExpenseRatio(double expenseRatio) {
        this.expenseRatio = expenseRatio;
    }

    public double getDividendYield() {
        return this.dividendYield;
    }

    public void setDividendYield(double dividendYield) {
        this.dividendYield = dividendYield;
    }

    public String getProvider() {
        return this.provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }
 
}

