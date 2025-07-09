package com.narain.portfoliotracker.model;

import java.time.LocalDateTime;

public abstract class Asset {
    protected String ticker;
    protected int quantity;
    protected double purchasePrice;
    protected LocalDateTime purchaseTime;
    protected String currency;

    public Asset(String ticker, int quantity, double purchasePrice, LocalDateTime purchaseTime, String currency) {
        this.ticker = ticker;
        this.quantity = quantity;
        this.purchasePrice = purchasePrice;
        this.purchaseTime = purchaseTime;
        this.currency = currency;
    }

    public abstract double getCurrentValue();
    public abstract String getType();

    public String getTicker() {
        return this.ticker;
    }

    public void setTicker (String ticker) {
        this.ticker = ticker;
    }

    public int getQuantity() {
        return this.quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPurchasePrice() {
        return this.purchasePrice;
    }

    public void setPurchasePrice(double purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public LocalDateTime getPurchaseTime() {
        return this.purchaseTime;
    }

    public void setPurchaseTime(LocalDateTime purchaseTime) {
        this.purchaseTime = purchaseTime;
    }

    public String getCurrency() { 
        return this.currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }
}
