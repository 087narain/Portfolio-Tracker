package com.narain.portfoliotracker.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import static org.mockito.Mockito.when;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.narain.portfoliotracker.PortfolioTrackerApplication;
import com.narain.portfoliotracker.config.AlphaVantageConfig;

@SpringBootTest(classes = PortfolioTrackerApplication.class)
public class MarketDataServiceTest {
    private MarketDataService marketDataService;
    private AlphaVantageConfig mockConfig;
    private RestTemplate mockRestTemplate;
    private ObjectMapper mockObjectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        mockConfig = new AlphaVantageConfig();
        mockRestTemplate = Mockito.mock(RestTemplate.class);
        mockConfig.setApiKey("demo");

        marketDataService = new MarketDataService(mockConfig, mockRestTemplate, mockObjectMapper);

    }

    @Test
    void testGetCurrentPriceReturnsExpectedValue() throws Exception {
        String mockJson = """
        {
          "Global Quote": {
            "01. symbol": "AAPL",
            "05. price": "123.45"
          }
        }
        """;

        ResponseEntity<String> mockResponse = ResponseEntity.ok(mockJson);
        when(mockRestTemplate.getForEntity(Mockito.anyString(), Mockito.eq(String.class)))
                .thenReturn(mockResponse);

        double price = marketDataService.getCurrentPrice("AAPL");
        assertEquals(123.45, price, 0.001); 

    }

}
