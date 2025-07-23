package com.narain.portfoliotracker.service;

import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.narain.portfoliotracker.model.Asset;
import com.narain.portfoliotracker.model.Portfolio;
import com.narain.portfoliotracker.model.User;
import com.narain.portfoliotracker.repository.PortfolioRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PortfolioService {

    @Autowired
    private MarketDataService marketDataService;

    @Autowired
    private UserService userService;

    @Autowired
    private PortfolioRepository portfolioRepository;

    public Portfolio createPortfolioForUser(Portfolio portfolio, String user) {
        User existingUser = userService.findUserByUsername(user)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        portfolio.setUser(existingUser);
        existingUser.getPortfolios().add(portfolio);

        return portfolioRepository.save(portfolio);
    }

    public List<Portfolio> getPortfoliosByUsername(String username) {
        return portfolioRepository.findByUserUsername(username);
    }

    public boolean userOwnsPortfolio(String username, UUID portfolioId) {
        return portfolioRepository.existsByIdAndUserUsername(portfolioId, username);
    }

    public void addAssetToPortfolio(String username, UUID portfolioId, Asset asset) throws AccessDeniedException {
        if (!userOwnsPortfolio(username, portfolioId)) {
            throw new AccessDeniedException("Unauthorized to modify this portfolio");
        }

        Portfolio portfolio = portfolioRepository.findById(portfolioId)
            .orElseThrow(() -> new EntityNotFoundException("Portfolio not found"));
        
        portfolio.addAsset(asset);
        portfolioRepository.save(portfolio);
    }

    public double getLiveValue(Asset asset) {
        double currentPrice = marketDataService.getCurrentPrice(asset.getTicker());
        return asset.getQuantity() * currentPrice;
    }

    public double getTotalPortfolioValue(Portfolio portfolio) {
        double totalValue = 0.0;
        for (Asset asset : portfolio.getAllAssets()) {
            totalValue += asset.getCurrentValue();
        }
        return totalValue + portfolio.getBalance();
    }

    public double getPortfolioLiveValue(Portfolio portfolio) {
        double totalValue = 0.0;
        for (Asset asset : portfolio.getAllAssets()) {
            totalValue += getLiveValue(asset);
        }
        return totalValue + portfolio.getBalance();
    }

    public double getPortfolioValueByType(Portfolio portfolio, String assetType) {
        double totalValue = 0.0;
        for (Asset asset : portfolio.getAllAssets()) {
            if (asset.getType().equals(assetType)) {
                totalValue += asset.getCurrentValue();
            }
        }
        return totalValue;
    }

    public Asset getAssetByTicker(Portfolio portfolio, String ticker) {
        return portfolio.getAssetByTicker(ticker);
    }

    public void addAssetToPortfolio(Portfolio portfolio, Asset asset) {
        if (portfolio.containsAsset(asset.getTicker())) {
            Asset existingAsset = portfolio.getAssetByTicker(asset.getTicker());
            existingAsset.setQuantity(existingAsset.getQuantity() + asset.getQuantity());
            existingAsset.setPurchasePrice((existingAsset.getPurchasePrice() + asset.getPurchasePrice()) / 2);
        } else {
            portfolio.addAsset(asset);
        }
    }

    public boolean removeAssetFromPortfolio(Portfolio portfolio, String ticker) {
        Asset asset = portfolio.getAssetByTicker(ticker);
        if (asset != null) {
            portfolio.getAllAssets().remove(asset);
            return true;
        }

        return false;
    }

    public Map<String, Double> getAssetValuesByType(Portfolio portfolio) {
        Map<String, Double> assetValues = new HashMap<>();
        for (Asset asset : portfolio.getAllAssets()) {
            String type = asset.getType();
            double value = asset.getCurrentValue();
            assetValues.put(type, assetValues.getOrDefault(type, 0.0) + value);
        }
        return assetValues;
    }
}