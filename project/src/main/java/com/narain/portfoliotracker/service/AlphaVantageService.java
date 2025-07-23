package com.narain.portfoliotracker.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service 
public class AlphaVantageService {

    @Value("${alphavantage.apiKey}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    
    public String getETFData(String symbol) {
        String url = String.format("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=%s&apikey=%s", symbol, apiKey);
        try {
            return restTemplate.getForObject(url, String.class);
        } catch (RestClientException e) {
            throw new RuntimeException("Failed to fetch data from Alpha Vantage", e);
        }
    }

}