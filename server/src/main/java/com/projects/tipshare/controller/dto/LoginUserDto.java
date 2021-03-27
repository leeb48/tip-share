package com.projects.tipshare.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class LoginUserDto {

    @NotNull
    @NotBlank(message = "Username is required")
    private String username;

    @NotNull
    @NotBlank(message = "Password is required")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private boolean rememberMe = false;
}
