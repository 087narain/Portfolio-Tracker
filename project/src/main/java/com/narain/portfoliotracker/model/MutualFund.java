package com.narain.portfoliotracker.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;

@Entity 
public class MutualFund extends Asset {
    private String fundManager;
    private double expenseRatio;
    private double nav;

    public MutualFund() {
        super();
    }
    
    public MutualFund(String ticker, int quantity, double purchasePrice, LocalDateTime purchaseTime, String currency, String fundManager, double expenseRatio, double nav) {
        super(ticker, quantity, purchasePrice, purchaseTime, currency);
        this.fundManager = fundManager;
        this.expenseRatio = expenseRatio;
        this.nav = nav;
    }

    @Override
    public double getCurrentValue() {
        return quantity * nav;
    }

    @Override
    public String getType() {
        return "MutualFund";
    }

    public String getFundManager() {
        return this.fundManager;
    }

    public void setFundManager(String fundManager) {
        this.fundManager = fundManager;
    }

    public double getExpenseRatio() {
        return this.expenseRatio;
    }

    public void setExpenseRatio(double expenseRatio) {
        this.expenseRatio = expenseRatio;
    }

    public double getNav() {
        return this.nav;
    }

    public void setNav(double nav) {
        this.nav = nav;
    }
}
