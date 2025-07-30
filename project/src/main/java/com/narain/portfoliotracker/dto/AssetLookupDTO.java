package com.narain.portfoliotracker.dto;

import java.util.UUID;

public class AssetLookupDTO {
    private UUID id;
    private String ticker;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }
}