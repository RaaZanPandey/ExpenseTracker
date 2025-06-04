package com.example.Expensestracker.Controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Expensestracker.Logics.CustomUserDetailsService;
import com.example.Expensestracker.Logics.UserLogic;
import com.example.Expensestracker.Models.User;

// @CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/user")
public class UserController {

  @Autowired
  private UserLogic userLogic;

  @Autowired
  private CustomUserDetailsService userDetailsService;

  @GetMapping
  public List<User> GetAll() {
    return userLogic.getAll();
  }

  @GetMapping("/{myId}")
  public Optional<User> getUserById(@PathVariable ObjectId myId) {
    return userLogic.getUserById(myId);
  }

  @PostMapping("/login")  //THIS IS FOR LOGIN TO AN EXISTING ACCOUNT
  public ResponseEntity<?> getUserByEmail(@RequestBody User user) {
   Optional<User> newUser = userLogic.getUserByEmail(user.getEmail());
   if(newUser.isPresent()){
    if(newUser.get().getPassword().equals(user.getPassword())){
      Map<String, Object> response = new HashMap<>();
      response.put("massage", "LOGIN SUCCESFULLY");
      response.put("user", newUser);
      return ResponseEntity.ok(response);
    }
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("INCORRECT PASSWORD");
   }
   return ResponseEntity.status(HttpStatus.NOT_FOUND).body("USER NOT FOUND");
  }



  @PostMapping //THIS IS FOR CREATE NEW ACCOUNT
  public ResponseEntity<?> Create(@RequestBody User user) {
    userDetailsService.CreateUser(user.getUsername(), user.getPassword(), user.getEmail());
    return ResponseEntity.ok("SignUp Succesfully");
  }

  @DeleteMapping("/{myID}")
  public boolean DeleteById(ObjectId myID) {
    userLogic.DeletById(myID);
    return true;
  }
}