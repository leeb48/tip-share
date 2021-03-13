package com.projects.tipshare.service.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class RegisterUserDto {

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Password is required")
    private String password;


}
