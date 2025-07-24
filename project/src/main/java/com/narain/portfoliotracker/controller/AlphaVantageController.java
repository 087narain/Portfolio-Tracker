package com.narain.portfoliotracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.narain.portfoliotracker.dto.AlphaVantageResponse;
import com.narain.portfoliotracker.dto.GlobalQuote;
import com.narain.portfoliotracker.service.AlphaVantageService;

@RestController
@RequestMapping("/api/alphavantage")
public class AlphaVantageController {

    @Autowired
    private AlphaVantageService alphaVantageService;

    @GetMapping("/etf/{symbol}")
    public ResponseEntity<GlobalQuote> getETFData(@PathVariable String symbol) {
        AlphaVantageResponse data = alphaVantageService.getETFData(symbol);
        System.out.println("GlobalQuote to return: " + data.getGlobalQuote());
        return ResponseEntity.ok(data.getGlobalQuote());
    }
}   