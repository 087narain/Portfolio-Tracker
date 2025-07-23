package com.narain.portfoliotracker.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.narain.portfoliotracker.dto.AlphaVantageResponse;

@Service 
public class AlphaVantageService {

    @Value("${alphavantage.apiKey}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public AlphaVantageService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    
    public AlphaVantageResponse getETFData(String symbol) {
        String url = String.format("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=%s&apikey=%s", symbol, apiKey);
        try {
            String response = restTemplate.getForObject(url, String.class);
            System.out.println("AlphaVantage response:\n" + response);
            return restTemplate.getForObject(url, AlphaVantageResponse.class);
        } catch (RestClientException e) {
            throw new RuntimeException("Failed to fetch data from Alpha Vantage", e);
        }
    }

}