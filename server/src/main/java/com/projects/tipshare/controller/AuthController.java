package com.projects.tipshare.controller;

import com.projects.tipshare.controller.dto.RegisterUserDto;
import com.projects.tipshare.service.UserService;
import com.projects.tipshare.service.ValidationService;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final ValidationService validationService;
    private final UserService userService;

    public AuthController(ValidationService validationService, UserService userService) {
        this.validationService = validationService;
        this.userService = userService;
    }

    /**
     * Registers a new user and sends back a valid JWT upon successful registration
     *
     * @param registerUserDto contains the new user registration info
     * @param result          contains any validation errors in the request body
     * @return send back a valid JWT
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterUserDto registerUserDto, BindingResult result) throws JSONException {

        if (result.hasErrors()) {
            return validationService.createErrorResponse(result);
        }

        userService.registerUser(registerUserDto);

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("userRegistered", registerUserDto.getUsername() + " has been registered.");

        return new ResponseEntity<>(jsonResponse.toString(), HttpStatus.OK);

    }

}
