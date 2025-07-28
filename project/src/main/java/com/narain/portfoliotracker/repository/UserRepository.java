package com.narain.portfoliotracker.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.narain.portfoliotracker.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    // Method to find a user by username
    Optional<User> findByUsername(String username);

    // Method to check if a user exists by username
    boolean existsByUsername(String username);

    // Method to delete a user by ID
    @Override
    void deleteById(UUID id);

    public User save(Optional<User> managedUser);

    // Method to find a user by ID
    @Override
    Optional<User> findById(UUID id);
}