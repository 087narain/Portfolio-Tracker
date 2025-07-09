package com.narain.portfoliotracker.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.narain.portfoliotracker.config.AlphaVantageConfig;

@Service
public class MarketDataService {

    private final AlphaVantageConfig config;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public MarketDataService(AlphaVantageConfig config) {
        this.config = config;
    }

    public double getCurrentPrice(String symbol) {
        try {
            String url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" 
                         + symbol + "&apikey=" + config.getApiKey();

            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            JsonNode root = objectMapper.readTree(response.getBody());
            JsonNode priceNode = root.path("Global Quote").path("05. price");

            return Double.parseDouble(priceNode.asText());
        } catch (Exception e) {
            e.printStackTrace();
            return -1.0; // Error case
        }
    }
}