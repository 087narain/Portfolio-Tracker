package com.narain.portfoliotracker.model;

import java.time.LocalDateTime;

public class Stock extends Asset {
    private double currentPrice;

    public Stock() {
        super();
    }
    
    public Stock(String ticker, int quantity, double purchasePrice, LocalDateTime purchaseTime, String currency, double currentPrice) {
        super(ticker, quantity, purchasePrice, purchaseTime, currency);
        this.currentPrice = currentPrice;
    }
    
    @Override
    public double getCurrentValue() {
        return (currentPrice * quantity);
    }

    @Override
    public String getType() {
        return "Stock";
    }

    public double getCurrentPrice() {
        return this.currentPrice;
    }

    public void setCurrentPrice(double currentPrice) {
        this.currentPrice = currentPrice;
    }

}
