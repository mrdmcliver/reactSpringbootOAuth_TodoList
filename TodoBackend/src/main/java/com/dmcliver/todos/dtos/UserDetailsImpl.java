package com.dmcliver.todos.dtos;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.dmcliver.todos.entities.User;

public class UserDetailsImpl extends User implements UserDetails {

    public UserDetailsImpl(String userName, String password) {
        this.username = userName;
        this.password = password;
    }

    public UserDetailsImpl() {

    }

    private static final long serialVersionUID = 1L;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        // TODO: At some stage add roles here
        return Collections.emptyList();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
