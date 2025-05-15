package com.example.Expensestracker.Logics;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.Expensestracker.Models.Income;
import com.example.Expensestracker.Models.User;
import com.example.Expensestracker.Repository.IncomeRepository;
import com.example.Expensestracker.Repository.UserRepository;

@Component
public class IncomeLogic {
    
    @Autowired
    private IncomeRepository incomeRepository;

     @Autowired
     private UserRepository userRepository;
    
     public List<Income> getAllUseIncomes(String username){
      Optional<User> user = userRepository.findByUsername(username);

      if(user.isPresent()){
         return user.get().getIncomes();
      }
        return null;
     }

     public void AddIncomeToUser(Income income, String username){
       Optional<User> user = userRepository.findByUsername(username);
        Income newIncome = incomeRepository.save(income);
      if(user.isPresent()){
         user.get().getIncomes().add(newIncome);
         userRepository.save(user.get());
      }
     }

     public Optional<Income> FindIncomeById(String myId){
        return incomeRepository.findById(myId);
     }

     public void DeleteIncomeById(String myId){
        incomeRepository.deleteById(myId);
     }


     public Optional<Income> UpdateIncome(Income updateIncome){
      Optional<Income> existIncome = incomeRepository.findById(updateIncome.getId());
      if(existIncome.isPresent()){
         Income UpdatedIncome = existIncome.get();
        UpdatedIncome.setTitle(updateIncome.getTitle());
        UpdatedIncome.setAmmount(updateIncome.getAmmount());
        UpdatedIncome.setDate(updateIncome.getDate());
        UpdatedIncome.setDescription(updateIncome.getDescription()); 
        incomeRepository.save(updateIncome);
        return Optional.of(UpdatedIncome);
      }
      return null;
     }
}
