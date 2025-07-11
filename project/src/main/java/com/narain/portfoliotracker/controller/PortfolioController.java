package com.narain.portfoliotracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.narain.portfoliotracker.model.Portfolio;
import com.narain.portfoliotracker.service.PortfolioService;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {
    
    @Autowired
    private PortfolioService portfolioService;

    @PostMapping("/total")
    public double getTotalValue(@RequestBody Portfolio portfolio) {
        return portfolioService.getTotalPortfolioValue(portfolio);
    }

    @PostMapping("/live")
    public double getLiveValue(@RequestBody Portfolio portfolio) {
        return portfolioService.getPortfolioLiveValue(portfolio);
    }
}
