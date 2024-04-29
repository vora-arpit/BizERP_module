package com.server.crm1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.crm1.model.users.User;
import com.server.crm1.repository.user.UserRepository;
import com.server.crm1.service.UserService;

@RestController
@RequestMapping("/profile")
public class ProfileSetting {

    
    @Autowired
    private UserRepository userRepo;

    @PutMapping("/setting")
    public User updateProfile(@RequestBody User user) {
        User u=userRepo.findById(user.getId()).get();


        u.setId(user.getId());
        u.setName(user.getName());
        u.setEmail(user.getEmail());
        u.setImageUrl(user.getImageUrl());

        return userRepo.save(u);
    }
}
