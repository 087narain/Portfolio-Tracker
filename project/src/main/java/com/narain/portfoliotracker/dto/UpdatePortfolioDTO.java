package com.narain.portfoliotracker.dto;

public class UpdatePortfolioDTO {
    private double balance;
    private String currency;

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }
}