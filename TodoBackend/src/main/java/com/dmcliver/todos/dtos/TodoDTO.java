package com.dmcliver.todos.dtos;

import java.io.Serializable;
import java.util.UUID;

public class TodoDTO implements Serializable {

    private static final long serialVersionUID = 1L;
    
    private UUID id;
    private String task;

    public TodoDTO(UUID id, String task) {
        this.setId(id);
        this.setTask(task);
    }

    public TodoDTO() {
    }
    
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }
}
