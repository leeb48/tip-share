package com.projects.tipshare.service;

import com.projects.tipshare.controller.dto.RegisterUserDto;
import com.projects.tipshare.model.Authority;
import com.projects.tipshare.model.User;
import com.projects.tipshare.repository.AuthorityRepo;
import com.projects.tipshare.repository.UserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    UserRepo userRepo;

    @Mock
    AuthorityRepo authorityRepo;

    @Mock
    PasswordEncoder passwordEncoder;

    UserService userService;

    @BeforeEach
    void setUp() {
        userService = new UserService(userRepo, authorityRepo, passwordEncoder);
    }

    @Test
    void registerUser() {

        // given
        RegisterUserDto newUser = new RegisterUserDto();
        newUser.setUsername("newUser");
        newUser.setPassword("12345");

        when(userRepo.existsByUsername(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("12345");
        when(authorityRepo.findById(anyString())).thenReturn(Optional.of(new Authority()));
        when(userRepo.save(any())).thenReturn(new User());


        // when
        userService.registerUser(newUser);

        // then
        verify(userRepo, times(1)).existsByUsername(anyString());
        verify(passwordEncoder, times(1)).encode(anyString());
        verify(authorityRepo, times(1)).findById(anyString());
        verify(userRepo, times(1)).save(any());
    }
}