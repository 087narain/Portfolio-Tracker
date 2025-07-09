package com.narain.portfoliotracker.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class User {
    private UUID id;
    private String name;
    private String email;
    private LocalDateTime creationDate;

    public User(String name, String email) {
        this.id = UUID.randomUUID();
        this.name = name;
        this.email = email;
        this.creationDate = LocalDateTime.now();
    }

    public UUID getID() {
        return this.id;
    }

    public void setID (UUID id) {
        this.id = id;
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

}
