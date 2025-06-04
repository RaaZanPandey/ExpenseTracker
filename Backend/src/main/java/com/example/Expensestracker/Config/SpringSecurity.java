package com.example.Expensestracker.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.example.Expensestracker.Logics.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
public class SpringSecurity {
    
     private PasswordEncoder passwordEncoder;
     private CustomUserDetailsService userDetailsService;

     public SpringSecurity(PasswordEncoder passwordEncoder, CustomUserDetailsService userDetailsService){
        this.passwordEncoder  = passwordEncoder;
        this.userDetailsService = userDetailsService;
     }

     @Bean
      public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        return http
        .csrf(customizer->customizer.disable())
        .authorizeHttpRequests(auth->auth
        .requestMatchers(HttpMethod.POST, "/user").permitAll()
            .requestMatchers(HttpMethod.POST, "/user/login").permitAll()
        .requestMatchers(HttpMethod.GET, "/user").permitAll()
        // .requestMatchers("/user/**").permitAll()
        .anyRequest().authenticated()
        )
        .formLogin(Customizer.withDefaults())
        .httpBasic(Customizer.withDefaults())
        .userDetailsService(userDetailsService)
        .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
        .build();
        
      }

}
