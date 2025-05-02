package com.dmcliver.todos.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.dmcliver.todos.entities.Todo;
import com.dmcliver.todos.entities.Todo_;
import com.dmcliver.todos.entities.User;
import com.dmcliver.todos.entities.User_;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;

@Repository
public class TodoRepositoryImpl implements TodoRepository {

    @Autowired
    private EntityManager entityManager;
    
    public List<Todo> findByUser(String userName) {
        
        CriteriaBuilder jpaFuncs = entityManager.getCriteriaBuilder();
        
        CriteriaQuery<Todo> query = jpaFuncs.createQuery(Todo.class);
        
        Root<Todo> todo = query.from(Todo.class);
        Join<Todo, User> user = todo.join(Todo_.user);
        query.where(jpaFuncs.equal(user.get(User_.username), userName));
        
        TypedQuery<Todo> typedQuery = entityManager.createQuery(query);
        List<Todo> resultList = typedQuery.getResultList();
        return resultList;
    }

    @Override
    @Transactional
    public void save(Todo todo) {
        
        entityManager.persist(todo);
        entityManager.flush();
    }

    @Override
    public Todo findById(UUID id) {
        return entityManager.find(Todo.class, id);
    }

    @Override
    @Transactional
    public void update(Todo todo) {
        
        entityManager.merge(todo);
        entityManager.flush();
    }
}
