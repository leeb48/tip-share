package com.projects.tipshare.controller;

import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.projects.tipshare.controller.dto.LoginUserDto;
import com.projects.tipshare.model.User;
import com.projects.tipshare.repository.AuthorityRepo;
import com.projects.tipshare.repository.UserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerIT {

    private final String USERNAME = "user1";
    private final String PASSWORD = "12345";
    @Autowired
    MockMvc mockMvc;
    @Autowired
    UserRepo userRepo;
    @Autowired
    AuthorityRepo authorityRepo;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    PasswordEncoder passwordEncoder;


    @Test
    void loginUserSuccess() throws Exception {
        // given
        // create and save new user
        User newUser = new User();
        newUser.setActivated(true);
        newUser.setUsername(USERNAME);
        newUser.setPassword(passwordEncoder.encode(PASSWORD));
        userRepo.save(newUser);

        LoginUserDto loginUserDto = new LoginUserDto();
        loginUserDto.setUsername(USERNAME);
        loginUserDto.setPassword(PASSWORD);

        // override WRITE_ONY annotation
        objectMapper.disable(MapperFeature.USE_ANNOTATIONS);
        String json = objectMapper.writeValueAsString(loginUserDto);

        // when
        mockMvc.perform(
                MockMvcRequestBuilders
                        .post("/api/auth/login")
                        .contentType("application/json")
                        .content(json)
        ).andExpect(status().isOk()).andReturn();
    }


    @Test
    void loginUserFail() throws Exception {
        // given
        LoginUserDto loginUserDto = new LoginUserDto();
        loginUserDto.setUsername("NoUser");
        loginUserDto.setPassword(PASSWORD);

        // override WRITE_ONY annotation
        objectMapper.disable(MapperFeature.USE_ANNOTATIONS);
        String json = objectMapper.writeValueAsString(loginUserDto);

        // when
        mockMvc.perform(
                MockMvcRequestBuilders
                        .post("/api/auth/login")
                        .contentType("application/json")
                        .content(json)
        ).andExpect(status().isUnauthorized()).andReturn();
    }
}