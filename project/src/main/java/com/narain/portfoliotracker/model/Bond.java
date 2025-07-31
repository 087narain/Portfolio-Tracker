package com.narain.portfoliotracker.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;

@Entity
public class Bond extends Asset {
    private LocalDate maturityDate;
    private double couponRate;
    private double faceValue;
    private String issuer;

    public Bond() {
        super();
    }

    public Bond(String ticker, int quantity, double purchasePrice, LocalDateTime purchaseTime, String currency, LocalDate maturityDate, double couponRate, double faceValue, String issuer) {
        super(ticker, quantity, purchasePrice, purchaseTime, currency);
        this.maturityDate = maturityDate;
        this.couponRate = couponRate;
        this.faceValue = faceValue;
        this.issuer = issuer;
    }

    @Override
    public double getCurrentValue() {
        return quantity * faceValue;
    }

    @Override
    public String getType() {
        return "Bond";
    }

    public LocalDate getMaturityDate() {
        return this.maturityDate;
    }

    public void setMaturityDate(LocalDate maturityDate) {
        this.maturityDate = maturityDate;
    }

    public double couponRate() {
        return this.couponRate;
    }

    public void setCouponRate(double couponRate) {
        this.couponRate = couponRate;
    }

    public double getFaceValue() {
        return this.faceValue;
    }

    public void setFaceValue(double faceValue) {
        this.faceValue = faceValue;
    }

    public String getIusser() {
        return this.issuer;
    }

    public void setIssuer(String issuer) {
        this.issuer = issuer;
    }

}
