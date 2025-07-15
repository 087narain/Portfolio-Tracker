package com.narain.portfoliotracker.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import com.narain.portfoliotracker.PortfolioTrackerApplication;

@SpringBootTest(classes = PortfolioTrackerApplication.class)
@AutoConfigureMockMvc
class PortfolioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testGetTotalValueEndpoint() throws Exception {
        String portfolioJson = """

        {
            "portfolioName": "Test Portfolio",
            "creationDate": "2025-07-15T12:00:00",
            "totalValue": 2600.0,
            "balance": 1000.0,
            "currency": "USD",
            "assets": [
                {
                    "ticker": "AAPL",
                    "quantity": 10,
                    "purchasePrice": 150.0,
                    "purchaseTime": "2025-07-14T10:00:00",
                    "type": "Stock"
                },
                {
                    "ticker": "TSLA",
                    "quantity": 5,
                    "purchasePrice": 200.0,
                    "purchaseTime": "2025-07-14T10:00:00",
                    "type": "Stock"
                }
            ]
        }
        """;


        var result = mockMvc.perform(post("/api/portfolio/total")
                .contentType("application/json")
                .content(portfolioJson))
                .andReturn()
                .getResponse();

        System.out.println("STATUS: " + result.getStatus());
        System.out.println("BODY: " + result.getContentAsString());

    }
}  
