package com.example.Expensestracker.Controllers;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthentationController {
    private AuthenticationManager authenticationManager;

      public AuthentationController(AuthenticationManager authenticationManager){
        this.authenticationManager = authenticationManager;
      }
      
    //   @PostMapping("/user/login")
    //   public ResponseEntity<?> Login(User user){
    //      try {
    //         Authentication authentication = authenticationManager.authenticate(
    //             new UsernamePasswordAuthenticationToken(
    //                 requests.getUsername(),
    //                 requests.getPassword
    //             )
    //         );
    //         return ResponseEntity.ok("Login Succesfully");
    //      } catch (AuthenticationException e) {
    //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("BAD CREADIANTIAL");
    //      }
    //   }
}
