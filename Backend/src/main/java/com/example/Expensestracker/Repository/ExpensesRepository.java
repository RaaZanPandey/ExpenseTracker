package com.example.Expensestracker.Repository;



import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Expensestracker.Models.Expenses;


public interface ExpensesRepository extends MongoRepository<Expenses, String>{
  

  
}
