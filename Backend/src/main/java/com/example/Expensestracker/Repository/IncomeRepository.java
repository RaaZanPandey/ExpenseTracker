package com.example.Expensestracker.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Expensestracker.Models.Income;

public interface IncomeRepository extends MongoRepository<Income, String>{
    
}
