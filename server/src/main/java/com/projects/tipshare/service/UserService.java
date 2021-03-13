package com.projects.tipshare.service;

import com.projects.tipshare.exception.authexception.DuplicateUsernameException;
import com.projects.tipshare.model.User;
import com.projects.tipshare.repository.UserRepo;
import com.projects.tipshare.service.dto.RegisterUserDto;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service for managing users
 */

@Service
@Transactional
public class UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(RegisterUserDto registerUserDto) {

        String username = registerUserDto.getUsername().toLowerCase();

        userRepo
                .findByUsername(username)
                .ifPresent(existingUser -> {
                    throw new DuplicateUsernameException("Username already exists");
                });

        User newUser = new User();
        newUser.setUsername(username);
        String encryptedPassword = passwordEncoder.encode(registerUserDto.getPassword());
        newUser.setActivated(true);


        return newUser;

    }

}
