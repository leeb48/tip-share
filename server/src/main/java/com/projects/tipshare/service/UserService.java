package com.projects.tipshare.service;

import com.projects.tipshare.controller.dto.RegisterUserDto;
import com.projects.tipshare.exception.authexception.DuplicateUsernameException;
import com.projects.tipshare.model.Authority;
import com.projects.tipshare.model.User;
import com.projects.tipshare.repository.AuthorityRepo;
import com.projects.tipshare.repository.UserRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static com.projects.tipshare.security.AuthoritiesConstants.USER;

/**
 * Service for managing users
 */

@Service
@Transactional
public class UserService {

    private final UserRepo userRepo;
    private final AuthorityRepo authorityRepo;
    private final PasswordEncoder passwordEncoder;


    public UserService(UserRepo userRepo, AuthorityRepo authorityRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.authorityRepo = authorityRepo;
        this.passwordEncoder = passwordEncoder;
    }

    /*
    Register new users with ROLE_USER authority
     */
    public void registerUser(RegisterUserDto registerUserDto) {

        String username = registerUserDto.getUsername().toLowerCase();
        String email = registerUserDto.getEmail();

        // check to see if user is already registered
        if (userRepo.existsByUsername(username)) {
            throw new DuplicateUsernameException(username + " is already registered.");
        }

        User newUser = new User();
        String hashedPassword = passwordEncoder.encode(registerUserDto.getPassword());

        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPassword(hashedPassword);

        Set<Authority> authorities = new HashSet<>();
        authorityRepo.findById(USER).ifPresent(authorities::add);
        newUser.setAuthorities(authorities);
        newUser.setActivated(true);
        userRepo.save(newUser);
    }

    public User findUserByUsername(String username) {
        return userRepo.findByUsername(username).orElse(null);
    }

    /*
    Remove user
     */
    public void removeUser(String username) {
        Optional<User> foundUser = userRepo.findByUsername(username);

        foundUser.ifPresent(userRepo::delete);
    }
}
