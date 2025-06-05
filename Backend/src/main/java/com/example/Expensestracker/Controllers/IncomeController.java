package com.example.Expensestracker.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Expensestracker.Logics.IncomeLogic;
import com.example.Expensestracker.Logics.UserLogic;
import com.example.Expensestracker.Models.Income;

@RestController
@RequestMapping("/income")
public class IncomeController {

    @Autowired
    IncomeLogic incomeLogic;
    
    @Autowired
    private UserLogic userLogic;


     @PostMapping("/{username}") // CREATE
    public ResponseEntity<?> addIncomeToaUser(@RequestBody Income newIncome, @PathVariable String username) {   //ADD INCOME TO A PARTICULAR USER
        incomeLogic.AddIncomeToUser(newIncome, username);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("NEW INCOME ADDED SUCCESFULLY");
    }

    @GetMapping("/{username}") // READ
    public ResponseEntity<?> getAllIncomeOfUser(@PathVariable String username) {
        return ResponseEntity.ok(incomeLogic.getAllUseIncomes(username));
    }

 
    @DeleteMapping("/{username}") // DELETE
    public ResponseEntity<?> deleteByExpenses(@RequestBody Income toBeDeleted, @PathVariable String username) {
        var user = userLogic.findByName(username);
        var myId = toBeDeleted.getId();
        var exp = incomeLogic.FindIncomeById(myId);

        if (exp != null) {
            incomeLogic.DeleteIncomeById(myId);
            user.get().getIncomes().removeIf(x->x.getId().equals(myId));
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("INCOME DELETED SUCCESFULLY");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("INCOME NOT FOUNF");
    }

    @PutMapping()
    public ResponseEntity<?> upDateUserIncome(@RequestBody Income UpdateIncome){
        var update = incomeLogic.UpdateIncome(UpdateIncome);
        if(update != null){
            return ResponseEntity.status(HttpStatus.OK).body("INCOME UPDATED SUCCESFULLY");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("INCOME NOT FOUND");
    }
}