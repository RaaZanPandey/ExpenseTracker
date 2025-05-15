package com.example.Expensestracker.Models;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "income")
@Data
public class Income {
  @Id
    private String id;
    private String title;
    private int ammount;
    private  LocalDate date;
    private String description;
    
}