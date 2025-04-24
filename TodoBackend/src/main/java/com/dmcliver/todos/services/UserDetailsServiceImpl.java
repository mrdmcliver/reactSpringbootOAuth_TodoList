package com.dmcliver.todos.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.dmcliver.todos.dtos.UserDetailsImpl;
import com.dmcliver.todos.entities.User;
import com.dmcliver.todos.repositories.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> user = userRepository.findByUsername(username);
        if (!user.isPresent())
            throw new UsernameNotFoundException("User name not found: " + username);

        var u = user.get();
        UserDetails details = new UserDetailsImpl(u.getUsername(), u.getPassword());
        return details;
    }
}
