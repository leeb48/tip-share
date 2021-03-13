package com.projects.tipshare;

import com.projects.tipshare.service.UserService;
import com.projects.tipshare.service.dto.RegisterUserDto;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class testRunner implements CommandLineRunner {

    private final UserService userService;

    public testRunner(UserService userService) {
        this.userService = userService;
    }


    @Override
    public void run(String... args) throws Exception {

        RegisterUserDto registerUserDto = new RegisterUserDto();
        registerUserDto.setUsername("user1");
        registerUserDto.setPassword("12345");

        userService.registerUser(registerUserDto);


    }
}
