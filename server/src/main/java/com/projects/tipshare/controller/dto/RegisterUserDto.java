package com.projects.tipshare.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class RegisterUserDto {

    @NotNull
    @Email
    @NotBlank(message = "Email is required")
    @Size(min = 5, max = 254)
    private String email;

    @NotNull
    @NotBlank(message = "Username is required")
    @Size(min = 5, max = 15, message = "Username must be between 5 - 15 characters")
    private String username;

    @NotNull
    @NotBlank(message = "Password is required")
    @Size(min = 5, max = 15, message = "Password must be between 5 - 15 characters")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

}
