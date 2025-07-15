package com.narain.portfoliotracker.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
  use = JsonTypeInfo.Id.NAME,
  include = JsonTypeInfo.As.PROPERTY,
  property = "type"
)
@JsonSubTypes({
    @JsonSubTypes.Type(value = Stock.class, name = "Stock"),
    @JsonSubTypes.Type(value = ETF.class, name = "ETF"),
    @JsonSubTypes.Type(value = CryptoAsset.class, name = "Crypto"),
    @JsonSubTypes.Type(value = MutualFund.class, name = "MutualFund"),
    @JsonSubTypes.Type(value = Bond.class, name = "Bond"),
})
public abstract class Asset {
    protected String ticker;
    protected int quantity;
    protected double purchasePrice;
    protected LocalDateTime purchaseTime;
    protected String currency;

    public Asset() {
        // Default constructor for serialization/deserialization
    }

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
