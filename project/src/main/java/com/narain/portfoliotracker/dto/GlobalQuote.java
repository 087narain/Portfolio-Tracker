package com.narain.portfoliotracker.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GlobalQuote {

    @JsonProperty("symbol")
    private String symbol;

    @JsonProperty("open")
    private String open;

    @JsonProperty("high")
    private String high;

    @JsonProperty("low")
    private String low;

    @JsonProperty("price")
    private String price;

    @JsonProperty("volume")
    private String volume;

    @JsonProperty("latest-trading-day")
    private String latestTradingDay;

    @JsonProperty("previous-close")
    private String previousClose;

    @JsonProperty("change")
    private String change;

    @JsonProperty("change-percent")
    private String changePercent;

    public GlobalQuote() {
        // Default constructor
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getOpen() {
        return open;
    }

    public void setOpen(String open) {
        this.open = open;
    }

    public String getHigh() {
        return high;
    }

    public void setHigh(String high) {
        this.high = high;
    }

    public String getLow() {
        return low;
    }

    public void setLow(String low) {
        this.low = low;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getVolume() {
        return volume;
    }

    public void setVolume(String volume) {
        this.volume = volume;
    }

    public String getLatestTradingDay() {
        return latestTradingDay;
    }

    public String getPreviousClose() {
        return previousClose;
    }

    public String getChange() {
        return change;
    }

    public void setChange(String change) {
        this.change = change;
    }

    public String getChangePercent() {
        return changePercent;
    }

    public void setChangePercent(String changePercent) {
        this.changePercent = changePercent;
    }

    public void setLatestTradingDay(String latestTradingDay) {
    this.latestTradingDay = latestTradingDay;
    }

    public void setPreviousClose(String previousClose) {
        this.previousClose = previousClose;
    }

    @Override
    public String toString() {
        return "GlobalQuote{" +
            "symbol='" + symbol + '\'' +
            ", open='" + open + '\'' +
            ", high='" + high + '\'' +
            ", low='" + low + '\'' +
            ", price='" + price + '\'' +
            ", volume='" + volume + '\'' +
            ", latestTradingDay='" + latestTradingDay + '\'' +
            ", previousClose='" + previousClose + '\'' +
            ", change='" + change + '\'' +
            ", changePercent='" + changePercent + '\'' +
            '}';
    }

}