package com.example.Expensestracker.Repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Expensestracker.Models.User;

public interface UserRepository extends MongoRepository<User, ObjectId>{

    Optional<User> findUserByEmail(String email);
    Optional<User> findByUsername(String username);
}