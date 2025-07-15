package com.narain.portfoliotracker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@Configuration
public class JacksonTimeConfig {

    @Bean
    public Module javaTimeModule() {
        return new JavaTimeModule();
    }
}