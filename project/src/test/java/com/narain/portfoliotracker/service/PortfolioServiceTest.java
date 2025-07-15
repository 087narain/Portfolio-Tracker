package com.narain.portfoliotracker.service;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.narain.portfoliotracker.model.Asset;
import com.narain.portfoliotracker.model.Portfolio;


class PortfolioServiceTest {
    private PortfolioService portfolioService;
    private Portfolio testPortfolio;

    @BeforeEach
    void setUp() {
        portfolioService = new PortfolioService();
        testPortfolio = new Portfolio("Test Portfolio", LocalDateTime.now(), 1000.0, 1000.0, "USD");

        Asset asset1 = new Asset("AAPL", 10, 150.0, LocalDateTime.now(), "USD") {
            @Override
            public double getCurrentValue() {
                return 1600.0;
            }

            @Override
            public String getType() {
                return "Stock";
            }
        };

        Asset asset2 = new Asset("TSLA", 5, 200.0, LocalDateTime.now(), "USD") {
            @Override
            public double getCurrentValue() {
                return 1000.0;
            }

            @Override
            public String getType() {
                return "Stock";
            }
            
        };

        testPortfolio.addAsset(asset1);
        testPortfolio.addAsset(asset2);
    }

    @Test
    void testGetTotalPortfolioValue() {
        double value = portfolioService.getTotalPortfolioValue(testPortfolio);
        assertEquals(3600.0, value, 0.01);
    }

    @Test
    void testGetPortfolioValueByType() {
        double stockValue = portfolioService.getPortfolioValueByType(testPortfolio, "Stock");
        assertEquals(2600.0, stockValue, 0.01);
    }

    @Test
    void testRemoveAssetFromPortfolio() {
        boolean removed = portfolioService.removeAssetFromPortfolio(testPortfolio, "TSLA");
        assertTrue(removed);
        assertNull(testPortfolio.getAssetByTicker("TSLA"));
    } 
}
