package com.narain.portfoliotracker.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.narain.portfoliotracker.model.Portfolio;
import com.narain.portfoliotracker.model.User;

public interface PortfolioRepository extends JpaRepository<Portfolio, UUID> {
    List<Portfolio> findByUser(User user);

    List<Portfolio> findByUserUsername(String username);

    boolean existsByIdAndUserUsername(UUID id, String username);

    Optional<Portfolio> findByIdAndUserUsername(UUID id, String username);
}