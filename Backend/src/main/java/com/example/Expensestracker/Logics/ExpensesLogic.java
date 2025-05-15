package com.example.Expensestracker.Logics;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
// import org.springframework.transaction.annotation.Transactional;

import com.example.Expensestracker.Models.Expenses;
import com.example.Expensestracker.Models.User;
import com.example.Expensestracker.Repository.ExpensesRepository;
import com.example.Expensestracker.Repository.UserRepository;

@Component
public class ExpensesLogic {

   @Autowired
   private ExpensesRepository expensesRepository;

   @Autowired
   private UserLogic userLogic;

   @Autowired
   private UserRepository userRepository;

   public List<Expenses> getAll() {
      return expensesRepository.findAll();
   }

   public List<Expenses> getUserExpenses(String username) {
      Optional<User> user = userLogic.findByName(username);
      if (user.isPresent()) {
         return user.get().getExpenses();
      }
      return null;
   }

   // @Transactional
   public void AddExpenses(Expenses expenses, String username) {
      try {
         Expenses expen = expensesRepository.save(expenses);
      Optional<User> user = userLogic.findByName(username);

      if (user.isPresent()) {

         user.get().getExpenses().add(expen);
         userRepository.save(user.get());
      }
      } catch (Exception e) {
         System.out.println("An error occure "+e);
      }
      
   }

   public Optional<Expenses> FindExpensesById(String myId) {
      return expensesRepository.findById(myId);
   }

   public void DeleteExpensesById(String myId) {
      expensesRepository.deleteById(myId);
   }

    public Optional<Expenses> UpdateExpenses(Expenses newExpenses){
      Optional<Expenses> ExistingExpenses = expensesRepository.findById(newExpenses.getId());
      if(ExistingExpenses.isPresent()){
         Expenses ExpensesToUpdate = ExistingExpenses.get();
         ExpensesToUpdate.setTitle(newExpenses.getTitle());
         ExpensesToUpdate.setAmmount(newExpenses.getAmmount());
         ExpensesToUpdate.setCategory(newExpenses.getCategory());
         ExpensesToUpdate.setDescription(newExpenses.getDescription());
         ExpensesToUpdate.setDate(newExpenses.getDate());
         expensesRepository.save(ExpensesToUpdate);
         return Optional.of(ExpensesToUpdate);
      }
      return null;
    }
}
