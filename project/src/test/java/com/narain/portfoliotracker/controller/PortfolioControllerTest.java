package com.narain.portfoliotracker.controller;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import com.narain.portfoliotracker.PortfolioTrackerApplication;
import com.narain.portfoliotracker.model.Portfolio;
import com.narain.portfoliotracker.model.User;
import com.narain.portfoliotracker.repository.PortfolioRepository;
import com.narain.portfoliotracker.repository.UserRepository;

@SpringBootTest(classes = PortfolioTrackerApplication.class)
@AutoConfigureMockMvc
class PortfolioControllerTest {

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Test
    void testGetTotalValueEndpoint() throws Exception {
    try {
        User testUser = new User();
        testUser.setUsername("testuser");
        testUser.setPasswordHash("dummy");
        testUser.setCreationDate(LocalDateTime.now()); 
        User savedUser = userRepository.save(testUser);

        Portfolio testPortfolio = new Portfolio();
        testPortfolio.setPortfolioName("Test Portfolio");
        testPortfolio.setBalance(1000.0);
        testPortfolio.setCurrency("USD");
        testPortfolio.setCreationDate(); 
        testPortfolio.setUser(savedUser); 

        Portfolio savedPortfolio = portfolioRepository.save(testPortfolio);

        String portfolioJson = """
        {
            "portfolioDTOId": "%s"
        }
        """.formatted(savedPortfolio.getId());

        var result = mockMvc.perform(post("/api/portfolio/total")
                .contentType("application/json")
                .content(portfolioJson))
                .andReturn()
                .getResponse();

        System.out.println("STATUS: " + result.getStatus());
        System.out.println("BODY: " + result.getContentAsString());

    } catch (Exception e) {
        System.err.println("Exception during test:");
        e.printStackTrace(); 
        throw e; 
    }
}
}  
