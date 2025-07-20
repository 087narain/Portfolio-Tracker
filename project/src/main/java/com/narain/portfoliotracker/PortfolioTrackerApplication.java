package com.narain.portfoliotracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;

import com.narain.portfoliotracker.config.AlphaVantageConfig;

@SpringBootApplication(scanBasePackages = "com.narain.portfoliotracker")
@ComponentScan(basePackages = {"com.narain.portfoliotracker"})
@EnableConfigurationProperties(AlphaVantageConfig.class)
public class PortfolioTrackerApplication {
    public static void main(String[] args) {
        SpringApplication.run(PortfolioTrackerApplication.class, args);
    }
}