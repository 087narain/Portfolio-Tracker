package com.narain.portfoliotracker.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Version;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private final List<Portfolio> portfolios = new ArrayList<>();

    @Version
    @Column(name = "version")
    private Long version;

    public User() {}

    public User(String username, String passwordHash) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.creationDate = LocalDateTime.now();
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

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public LocalDateTime getCreationDate() {
        return this.creationDate;
    }

    public Long getVersion() {
        return this.version;
    }

    public void setVersion(Long version) {
        this.version = version;
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
