package com.dmcliver.todos.controllers;

import java.util.UUID;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dmcliver.todos.dtos.TokenDTO;
import com.dmcliver.todos.entities.User;
import com.dmcliver.todos.model.LoginForm;
import com.dmcliver.todos.repositories.UserRepository;
import com.dmcliver.todos.services.TokenService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class AppController {

    private static final Logger log = LogManager.getLogger(AppController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/auth/login")
    public ResponseEntity<TokenDTO> getAuthData(@Valid @RequestBody LoginForm form) {

        Authentication authentication = authenticationManager
            .authenticate(new UsernamePasswordAuthenticationToken(form.getName(), form.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        log.info("Token requested for user :{}", authentication.getPrincipal());
        String token = tokenService.generateToken(authentication);

        var tokenDTO = new TokenDTO();
        tokenDTO.setToken(token);
        return ResponseEntity.ok(tokenDTO);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<String> register(@Valid @RequestBody LoginForm form) {

        var user = new User();
        user.setUsername(form.getName());
        user.setPassword(passwordEncoder.encode(form.getPassword()));
        user.setId(UUID.randomUUID().toString());

        userRepository.save(user);

        Authentication authentication = authenticationManager
            .authenticate(new UsernamePasswordAuthenticationToken(form.getName(), form.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        log.info("Token requested for user :{}", authentication.getPrincipal());
        String token = tokenService.generateToken(authentication);

        return ResponseEntity.ok(token);
    }
    
    @GetMapping("/auth/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Service test message");
    }

    @GetMapping("/todos")
    public ResponseEntity<String> getTodos(HttpServletRequest req, HttpServletResponse resp) {

        String user = "";
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null) {

            user = authentication.getName();
            if (authentication.getPrincipal() != null)
                user = user + ", " + authentication.getPrincipal().toString();
        }

        return ResponseEntity.ok("todo data 'so far' for " + user);
    }
}
