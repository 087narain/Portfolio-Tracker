package com.narain.portfoliotracker.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class User {
    private final UUID id;
    private String username;
    private String passwordHash;
    private LocalDateTime creationDate;
    private final List<Portfolio> portfolios;

    public User(String username, String passwordHash) {
        this.id = UUID.randomUUID();
        this.username = username;
        this.passwordHash = passwordHash;
        this.creationDate = LocalDateTime.now();
        this.portfolios = new ArrayList<>();
    }

    @Override
    public String toString() {
        return "User{" +
           "id=" + id +
           ", name='" + username + '\'' +
           ", creationDate=" + creationDate +
           '}'; 
    }

    public UUID getId() {
        return this.id;
    }

    public String getUsername()  {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswordHash() {
        return this.passwordHash;
    }

    public void setPasswordHash(String password) {
        this.passwordHash = passwordHash;
    }

    public LocalDateTime getCreationDate() {
        return this.creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public List<Portfolio> getPortfolios() {
        return this.portfolios;
    }

    public void addPortfolio(Portfolio portfolio) {
        this.portfolios.add(portfolio);
    }

    public boolean removePortfolioByName(String portfolioName) {
        return this.portfolios.removeIf(p -> p.getPortflioName().equals(portfolioName));
    }

    public Portfolio getPortfolioByName(String portfolioName) {
        for (Portfolio portfolio : this.portfolios) {
            if (portfolio.getPortflioName().equals(portfolioName)) {
                return portfolio;
            }
        }
        return null;
    }

    public boolean containsPortfolio(String portfolioName) {
        return this.portfolios.stream().anyMatch(p -> p.getPortflioName().equals(portfolioName));
    }

    public boolean containsPortfolio(Portfolio portfolio) {
        return this.portfolios.contains(portfolio);
    }

    public void clearPortfolios() {
        this.portfolios.clear();
    }

    public int getPortfolioCount() {
        return this.portfolios.size();
    }

    public Portfolio getPortfolioById(UUID portfolioId) {
        for (Portfolio portfolio : this.portfolios) {
            if (portfolio.getId().equals(portfolioId)) {
                return portfolio;
            }
        }
        return null;
    }

    public boolean removePortfolioById(UUID portfolioId) {
        return this.portfolios.removeIf(p -> p.getId().equals(portfolioId));
    }

}
