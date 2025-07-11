package com.narain.portfoliotracker.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class User {
    private final UUID id;
    private String name;
    private String email;
    private LocalDateTime creationDate;
    private Portfolio portfolio;

    public User(String name, String email, Portfolio portfolio) {
        this.id = UUID.randomUUID();
        this.name = name;
        this.email = email;
        this.creationDate = LocalDateTime.now();
        this.portfolio = portfolio;
    }

    @Override
    public String toString() {
        return "User{" +
           "id=" + id +
           ", name='" + name + '\'' +
           ", email='" + email + '\'' +
           ", creationDate=" + creationDate +
           '}'; 
    }

    public UUID getId() {
        return this.id;
    }

    public String getName()  {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getCreationDate() {
        return this.creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public Portfolio getPortfolio() {
        return this.portfolio;
    }

    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }

}
