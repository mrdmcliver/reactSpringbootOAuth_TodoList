package com.dmcliver.todos.model;

import java.io.Serializable;

import jakarta.validation.constraints.NotEmpty;

public class NewUserTodo implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotEmpty(message = "todo should have a user")
    private String username;
    
    @NotEmpty(message = "todo needs a title/description")
    private String description;
    
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
}
