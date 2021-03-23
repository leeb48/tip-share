package com.projects.tipshare.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class LoginUserDto {

    @NotNull
    @NotBlank(message = "Username is required")
    @Size(min = 5, max = 15, message = "Username must be between 5 - 15 characters")
    private String username;

    @NotNull
    @NotBlank(message = "Password is required")
    @Size(min = 5, max = 15, message = "Password must be between 5 - 15 characters")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private boolean rememberMe = false;
}
