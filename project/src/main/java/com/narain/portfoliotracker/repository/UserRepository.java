package com.narain.portfoliotracker.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.narain.portfoliotracker.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    @Override
    void deleteById(UUID id);

    public User save(Optional<User> managedUser);

    @Override
    Optional<User> findById(UUID id);
}