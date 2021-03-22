package com.projects.tipshare;

import com.projects.tipshare.repository.AuthorityRepo;
import com.projects.tipshare.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class testRunner implements CommandLineRunner {

    private final UserService userService;
    private final AuthorityRepo authorityRepo;

    public testRunner(UserService userService, AuthorityRepo authorityRepo) {
        this.userService = userService;
        this.authorityRepo = authorityRepo;
    }


    @Override
    public void run(String... args) throws Exception {

//        RegisterUserDto registerUserDto = new RegisterUserDto();
//        registerUserDto.setUsername("user1");
//        registerUserDto.setPassword("12345");
//
//        User savedUser = userService.registerUser(registerUserDto);
//
//        System.out.println(savedUser);


    }
}
