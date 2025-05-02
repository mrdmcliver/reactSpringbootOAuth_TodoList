package com.dmcliver.todos.model;

import java.io.Serializable;
import java.util.UUID;

import jakarta.validation.constraints.NotEmpty;

public class UpdateUserTodo implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotEmpty(message = "todo for update must contain id")
    private String id;
    
    private boolean completed;

    @NotEmpty(message = "todo must contain a task description")
    private String description;
    
    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
