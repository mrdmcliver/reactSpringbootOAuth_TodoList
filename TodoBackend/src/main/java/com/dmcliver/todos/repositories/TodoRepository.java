package com.dmcliver.todos.repositories;

import java.util.List;
import java.util.UUID;

import com.dmcliver.todos.entities.Todo;

public interface TodoRepository {
    
    List<Todo> findByUser(String userName);
    void save(Todo todo);
    Todo findById(UUID id);
    void update(Todo todo);
}
