package com.narain.portfoliotracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.narain.portfoliotracker.service.AlphaVantageService;

@RestController
@RequestMapping("/api/alphavantage")
public class AlphaVantageController {

    @Autowired
    private AlphaVantageService alphaVantageService;

    @GetMapping("/etf/{symbol}")
    public ResponseEntity<String> getETFData(String symbol) {
        String data = alphaVantageService.getETFData(symbol);

        return ResponseEntity.ok(data);
    }
}