package com.dmcliver.todos.model;

import java.io.Serializable;

import org.hibernate.validator.constraints.Length;
import jakarta.validation.constraints.NotEmpty;

public class LoginForm implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotEmpty(message = "Please enter a name")
    private String name;

    @Length(min = 6, message = "Password should be at least six characters")
    private String password;
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
