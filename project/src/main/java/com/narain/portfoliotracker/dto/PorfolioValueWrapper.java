package com.narain.portfoliotracker.dto;
public class PorfolioValueWrapper {
    private double totalValue;

    public PorfolioValueWrapper(double totalValue) {
        this.totalValue = totalValue;
    }

    public double getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(double totalValue) {
        this.totalValue = totalValue;
    }
}
