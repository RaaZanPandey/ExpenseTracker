package com.example.Expensestracker.Controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Expensestracker.Logics.ExpensesLogic;
import com.example.Expensestracker.Logics.UserLogic;
import com.example.Expensestracker.Models.Expenses;
import com.example.Expensestracker.Models.User;


@RestController
@RequestMapping("/expenses")
public class ExpensesController {

    @Autowired
   private  ExpensesLogic expensesLogic;

    @Autowired
    private UserLogic userLogic;

    @PostMapping("/{username}") // ADD EXPENSES TO A PARTICULAR USER ID
    public ResponseEntity<?> addExpensesInUser(@RequestBody Expenses newExpenses, @PathVariable String username) {
      
        expensesLogic.AddExpenses(newExpenses, username);
        return ResponseEntity.status(HttpStatus.CREATED).body("NEW EXPENSES ADDED SUCCESFULLY");
    }

   
    @GetMapping("/{username}") // READ
    public ResponseEntity<?> getAllexpensesOfuser(@PathVariable String username) {
        return ResponseEntity.ok(expensesLogic.getUserExpenses(username));
    }

    @GetMapping("id/{myId}") // READ BY ID
    public ResponseEntity<?> GetExpensesById(@PathVariable String myId) {
       Optional<Expenses> exp = expensesLogic.FindExpensesById(myId);
        if (exp != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("massage", "FOUND EXPENSES");
            response.put("Expenses", exp);
            return ResponseEntity.status(HttpStatus.FOUND).body(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("EXPENSES NOT FOUND");

    }

    @DeleteMapping("/{username}") // DELETE
    public ResponseEntity<?> deleteByExpenses(@RequestBody Expenses toBeDeleted, @PathVariable String username) {
       Optional<User> user = userLogic.findByName(username);
        // if(user.isPresent()){
        //  user.get().getExpenses().DeleteExpensesById(toBeDeleted.getId());
        // }
        var myId = toBeDeleted.getId();
        Optional<Expenses> exp = expensesLogic.FindExpensesById(myId);
        
        if (exp != null) {
            expensesLogic.DeleteExpensesById(myId);
             user.get().getExpenses().removeIf(x->x.getId().equals(myId));
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("EXPENSES DELETED SUCCESFULLY");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("EXPENSES NOT FOUNF");
    }


    @PutMapping()
    public ResponseEntity<?> updateExpenses(@RequestBody Expenses updatExpenses){

      Optional<Expenses>  update = expensesLogic.UpdateExpenses(updatExpenses);
       if(update == null) {
        return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body("NOTHING TO UPDATE");
       }
        
        return ResponseEntity.status(HttpStatus.OK).body("UPDATED SUCCESFULLY");
    }
}
