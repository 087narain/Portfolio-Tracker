package com.narain.portfoliotracker.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.narain.portfoliotracker.dto.AuthRequest;
import com.narain.portfoliotracker.model.User;
import com.narain.portfoliotracker.security.JwtUtil;
import com.narain.portfoliotracker.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthenticatorController {

    @Autowired
    private JwtUtil jwtUtil;

    private final UserService userService;
    

    public AuthenticatorController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody AuthRequest request) {
        if (request.getUsername() == null || request.getPassword() == null) {
            return ResponseEntity.badRequest().body("Username and password must not be empty");
        }

        Optional<User> existingUser = userService.findUserByUsername(request.getUsername());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }

        userService.registerUser(request.getUsername(), request.getPassword());
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthRequest request) {
        if (request.getUsername() == null || request.getPassword() == null) {
            return ResponseEntity.badRequest().body("Username and password must not be empty");
        }

        Optional<User> userOpt = userService.findUserByUsername(request.getUsername());
        if (userOpt.isEmpty() || !userService.authenticate(userOpt.get(), request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        String token = jwtUtil.generateToken(request.getUsername());
        return ResponseEntity.ok(token);
    }
}
