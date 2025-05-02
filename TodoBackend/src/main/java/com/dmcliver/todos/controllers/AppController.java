package com.dmcliver.todos.controllers;

import static java.util.stream.Collectors.toList;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dmcliver.todos.dtos.TodoDTO;
import com.dmcliver.todos.dtos.TokenDTO;
import com.dmcliver.todos.entities.Todo;
import com.dmcliver.todos.entities.User;
import com.dmcliver.todos.model.LoginForm;
import com.dmcliver.todos.model.UpdateUserTodo;
import com.dmcliver.todos.model.NewUserTodo;
import com.dmcliver.todos.model.ResponseModel;
import com.dmcliver.todos.repositories.TodoRepository;
import com.dmcliver.todos.repositories.UserRepository;
import com.dmcliver.todos.services.TokenService;

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
    private TodoRepository todoRepository;

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

    @GetMapping("/todos/{username}")
    public ResponseEntity<List<TodoDTO>> getTodos(@PathVariable String username) {

        List<Todo> todos = todoRepository.findByUser(username);
        List<TodoDTO> todosDTO = todos.stream().map(t -> new TodoDTO(t.getId(), t.getTask())).collect(toList());
        return ResponseEntity.ok(todosDTO);
   }
    
    @PostMapping("/todo/create")
    public ResponseEntity<Todo> newTodo(@Valid @RequestBody NewUserTodo todoModel) {

        Optional<User> user = userRepository.findByUsername(todoModel.getUsername());
        if(user.isPresent()) {
            
            Todo todo = new Todo();
            todo.setId(UUID.randomUUID());
            todo.setUser(user.get());
            todo.setTask(todoModel.getDescription());
            todoRepository.save(todo);
            return ResponseEntity.ok(todo);
        } else
            throw new UsernameNotFoundException(todoModel.getUsername() + " not found");
    }
    
    @PutMapping("/todo/update")
    public ResponseEntity<ResponseModel> update(@Valid @RequestBody UpdateUserTodo todoModel) {
        
        String id = todoModel.getId();
        Todo todo = todoRepository.findById(UUID.fromString(id));
        todo.setCompleted(todoModel.isCompleted());
        todo.setTask(todoModel.getDescription());
        todoRepository.update(todo);
        return ResponseEntity.ok(new ResponseModel());
    }
}
