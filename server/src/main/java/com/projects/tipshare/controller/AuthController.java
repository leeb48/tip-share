package com.projects.tipshare.controller;

import com.projects.tipshare.controller.dto.LoginUserDto;
import com.projects.tipshare.controller.dto.RegisterUserDto;
import com.projects.tipshare.security.jwt.JWTProvider;
import com.projects.tipshare.service.UserService;
import com.projects.tipshare.service.ValidationService;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static com.projects.tipshare.security.SecurityConstants.AUTHORIZATION_HEADER;
import static com.projects.tipshare.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final ValidationService validationService;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JWTProvider jwtProvider;
    private final UserService userService;


    public AuthController(ValidationService validationService,
                          AuthenticationManagerBuilder authenticationManagerBuilder,
                          JWTProvider jwtProvider,
                          UserService userService) {
        this.validationService = validationService;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.jwtProvider = jwtProvider;
        this.userService = userService;
    }

    /**
     * Registers a new user.
     *
     * @param registerUserDto contains the new user registration info
     * @param result          contains any validation errors in the request body
     * @return sends back user created response message
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterUserDto registerUserDto,
                                          BindingResult result) throws JSONException {

        if (result.hasErrors()) {
            return validationService.createFieldErrorResponse(result);
        }

        userService.registerUser(registerUserDto);

        return ResponseEntity.ok(registerUserDto.getUsername() + " has been registered."
                + " Please login with your new account.");
    }

    /**
     * @param loginUserDto contains user login info
     * @param result       contains any validation errors in the request body
     * @return sends back a valid JWT or login fail message
     */

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginUserDto loginUserDto, BindingResult result) throws JSONException {


        if (result.hasErrors()) {
            return validationService.createFieldErrorResponse(result);
        }

        try {

            // perform authentication
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    loginUserDto.getUsername().toLowerCase(),
                    loginUserDto.getPassword()
            );

            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);


            if (authentication != null) {
                SecurityContextHolder.getContext().setAuthentication(authentication);


                // create jwt and append it to header
                String jwt = jwtProvider.generateJWT(authentication, loginUserDto.isRememberMe());
                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.add(AUTHORIZATION_HEADER, TOKEN_PREFIX + jwt);

                JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("jwt", jwt);

                return new ResponseEntity<>(jsonResponse.toString(), httpHeaders, HttpStatus.OK);
            }
        } catch (Exception ignored) {
            ignored.printStackTrace();
        }

        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("loginFail", "Login Failed");

        return new ResponseEntity<>(jsonResponse.toString(), HttpStatus.UNAUTHORIZED);

    }

}
