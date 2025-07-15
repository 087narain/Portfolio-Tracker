package com.narain.portfoliotracker;

import java.util.Arrays;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.web.client.RestTemplate;

import com.narain.portfoliotracker.config.AlphaVantageConfig;
import com.narain.portfoliotracker.service.MarketDataService;

public class BeanCheck {

    public static void main(String[] args) {
        try (AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext("com.narain.portfoliotracker")) {
            ApplicationContext context = ctx;
            System.out.println("RestTemplate beans: " + Arrays.toString(context.getBeanNamesForType(RestTemplate.class)));
            System.out.println("AlphaVantageConfig beans: " + Arrays.toString(context.getBeanNamesForType(AlphaVantageConfig.class)));
            System.out.println("MarketDataService beans: " + Arrays.toString(context.getBeanNamesForType(MarketDataService.class)));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}