package com.example.Expensestracker.Logics;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.Expensestracker.Models.User;
import com.example.Expensestracker.Repository.UserRepository;

@Component
public class UserLogic {

    @Autowired
   private UserRepository userRepository;

    public List<User> getAll(){
        return userRepository.findAll();
    }

    public Boolean CreateUser(User newUser){
     userRepository.save(newUser);
     return true;
    }

    public Optional<User> getUserByEmail(String email){
        return userRepository.findUserByEmail(email);
    }
    
    public Optional<User> getUserById(ObjectId myId){
        return userRepository.findById(myId);
    }  

    public Boolean DeletById(ObjectId myId){
        userRepository.deleteById(myId);
        return true;
    }

    public Optional<User> findByName(String username) {
        return userRepository.findByUsername(username);
    }

    public void CreateUser(Optional<User> user) {
        userRepository.save(user.get());
    }
  
}