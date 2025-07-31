package com.narain.portfoliotracker.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.OneToMany;
@Entity
public class Portfolio {

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Id
    private UUID id;
    
    private String portfolioName;
    
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "portfolio_id") 
    private List<Asset> assets;
    
    private LocalDateTime creationDate;
    private double totalValue;
   
    @ElementCollection
    @CollectionTable(name = "portfolio_asset_type_breakdown", joinColumns = @JoinColumn(name = "portfolio_id"))
    @MapKeyColumn(name = "asset_type")
    @Column(name = "asset_value")
    private Map<String, Double> assetTypeBreakdown;
    private double balance;
    private String currency;
    
    public Portfolio() {
        this.id = UUID.randomUUID();
        this.creationDate = LocalDateTime.now();
        this.assetTypeBreakdown = new HashMap<>();
        this.assets = new ArrayList<>();
    }

    public Portfolio(String portfolioName, LocalDateTime creationDate, double totalValue, double balance, String currency) {
        this.portfolioName = portfolioName;
        this.id = UUID.randomUUID();
        this.assets = new ArrayList<>();
        this.creationDate = creationDate;
        this.totalValue = totalValue;
        this.assetTypeBreakdown = new HashMap<>();
        this.balance = balance;
        this.currency = currency;
    }

    public String getPortflioName() { return this.portfolioName; }
    public void setPortfolioName(String portfolioName) { this.portfolioName = portfolioName; }

    public UUID getId() { return this.id; }

    public void addAsset(Asset asset) { assets.add(asset); }

    public User getUser() { return this.user; }
    
    public void setUser(User user) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }
        this.user = user;
    }

    public boolean removeAssetByTicker(String ticker) {
        Iterator<Asset> iterator = assets.iterator();
        while (iterator.hasNext()) {
            Asset nextAsset = iterator.next();
            if (Objects.equals(nextAsset.getTicker(), ticker)) {
                iterator.remove();
                return true;
            }
        }

        return false;
    }   

    public Asset getAssetByTicker(String ticker) {
        for (Asset asset : assets) {
            if (asset.getTicker().equals(ticker)) return asset;
        }

        return null;
    }

    public List<Asset> getAllAssets() { return assets; }

    public void setAssets(List<Asset> assets) {
        if (assets == null) {
            throw new IllegalArgumentException("Assets list cannot be null");
        }
        this.assets = assets;
        recalculateFromAssets(assets);
    }

    public double getTotalValueByType(String type) {
        double netValue = 0;

        if (type == null) return 0;

        for (Asset asset : assets) {
            if (asset.getType().equals(type)) netValue += asset.getCurrentValue();
        }

        return netValue;
    }

    public List<Asset> getAssetsByType(String type) {
        List<Asset> filtered = new ArrayList<>();

        if (type == null) return filtered;

        for (Asset asset : assets) {
            if (asset.getType().equals(type)) {
                filtered.add(asset);
            }
        }

        return filtered;
    }

    public boolean containsAsset(String ticker) {
        if (ticker == null) return false;

        for (Asset asset : assets) {
            if (asset.getTicker().equals(ticker)) return true;
        }

        return false;
    }

    public LocalDateTime getCreationDate() { return this.creationDate; }

    public void setCreationDate() {
        if (creationDate == null) {
            throw new IllegalArgumentException("Creation date cannot be null");
        }
        this.creationDate = LocalDateTime.now();
    }

    public double getTotalValue() {
        double total = 0;
        for (Asset asset : assets) {
            total += asset.getCurrentValue();
        }
        this.totalValue = total;
        return this.totalValue;
    }

    public void setTotalValue(double totalValue) {
        this.totalValue = totalValue;
    }

    public void putOrUpdate(String type, double value) {
        if (type == null || value < 0) return;

        assetTypeBreakdown.put(type, assetTypeBreakdown.getOrDefault(type, 0.0) + value);
    }

    public double getValue(String type) {
        if (type == null) return 0;

        return assetTypeBreakdown.getOrDefault(type, 0.0);
    }

    public boolean remove(String type) {
        if (type == null) return false;

        if (assetTypeBreakdown.containsKey(type)) {
            assetTypeBreakdown.remove(type);
            return true;
        }

        return false;
    }

    public Set<String> getAllAssetTypes() {
        return assetTypeBreakdown.keySet();
    }

    public void recalculateFromAssets(List<Asset> assets) {
        this.assets = assets;
        this.totalValue = 0;
        this.assetTypeBreakdown.clear();

        for (Asset asset : assets) {
            double currentValue = asset.getCurrentValue();
            totalValue += currentValue;
            putOrUpdate(asset.getType(), currentValue);
        }
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance){
        if (balance < 0) {
            throw new IllegalArgumentException("Balance cannot be negative");
        }
        this.balance = balance;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        if (currency == null || currency.isEmpty()) {
            throw new IllegalArgumentException("Currency cannot be null or empty");
        }
        this.currency = currency;
    }

    public Map<String, Double> getAssetTypeBreakdown() {
        return assetTypeBreakdown;
    }

    public void setAssetTypeBreakdown(Map<String, Double> assetTypeBreakdown) {
        if (assetTypeBreakdown == null) {
            throw new IllegalArgumentException("Asset type breakdown cannot be null");
        }
        this.assetTypeBreakdown = assetTypeBreakdown;
    }

    public void clear() {
        assets.clear();
        assetTypeBreakdown.clear();
        totalValue = 0;
        balance = 0;
    }

}  
