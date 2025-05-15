package com.example.Expensestracker.Models;

// import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import java.time.LocalDate;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "expenses")
@Data
@NoArgsConstructor
public class Expenses {
    @Id
    private String id;
    private String title;
    private int ammount;
    private  LocalDate date;
    private String category;
    private String description;
}
