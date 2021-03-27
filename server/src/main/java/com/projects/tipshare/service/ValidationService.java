package com.projects.tipshare.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.HashMap;

@Service
public class ValidationService {

    public ResponseEntity<?> createFieldErrorResponse(BindingResult result) {

        HashMap<String, String> errors = new HashMap<>();

        result.getFieldErrors().forEach(error -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });

        return new ResponseEntity<HashMap<String, String>>(errors, HttpStatus.BAD_REQUEST);

    }

    public ResponseEntity<?> createObjectErrorResponse(BindingResult result) {

        HashMap<String, String> errors = new HashMap<>();

        result.getGlobalErrors().forEach(error -> {
            if (error.getCode().contains("SearchPlacesQueryConstraint")) {

                errors.put("searchPlacesError", error.getDefaultMessage());

            }
        });

        return new ResponseEntity<HashMap<String, String>>(errors, HttpStatus.BAD_REQUEST);

    }

}
