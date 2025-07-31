package com.narain.portfoliotracker.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;

@Entity
public class CryptoAsset extends Asset {
    private String coinName;
    private String exchange;
    private String walletAddress;

    public CryptoAsset() {
        super();
    }

    public CryptoAsset(String ticker, int quantity, double purchasePrice, LocalDateTime purchaseTime, String currency, String coinName, String exchange, String walletAddress) {
        super(ticker, quantity, purchasePrice, purchaseTime, currency);
        this.coinName = coinName;
        this.exchange = exchange;
        this.walletAddress = walletAddress;
    }

    @Override
    public double getCurrentValue() {
        return quantity * purchasePrice;
    }

    @Override
    public String getType() {
        return "CryptoAsset";
    }

    public String getCoinName() {
        return this.coinName;
    }

    public void setCoinName(String coinName) {
        this.coinName = coinName;
    }

    public String getExchange() {
        return this.exchange;
    }

    public void setExchange(String exchange) {
        this.exchange = exchange;
    }

    public String getWalletAddress() {
        return this.walletAddress;
    }

    public void setWalletAddress(String walletAddress) {
        this.walletAddress = walletAddress;
    }
}
