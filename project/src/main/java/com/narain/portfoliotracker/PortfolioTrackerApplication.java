package com.narain.portfoliotracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.narain.portfoliotracker.config.AlphaVantageConfig;

@SpringBootApplication
@EnableConfigurationProperties(AlphaVantageConfig.class)
public class PortfolioTrackerApplication {
    public static void main(String[] args) {
        SpringApplication.run(PortfolioTrackerApplication.class, args);
    }
}