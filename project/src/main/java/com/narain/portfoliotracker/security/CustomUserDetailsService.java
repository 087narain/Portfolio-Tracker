package com.narain.portfoliotracker.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.narain.portfoliotracker.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Trying to load user: " + username);
        return userRepository.findByUsername(username)
            .map(CustomUserDetails::new)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}