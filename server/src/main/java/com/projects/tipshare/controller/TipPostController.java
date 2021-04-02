package com.projects.tipshare.controller;

import com.projects.tipshare.controller.dto.CreateTipPostDto;
import com.projects.tipshare.service.TipPostService;
import com.projects.tipshare.service.ValidationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/tip-post")
public class TipPostController {

    private final ValidationService validationService;
    private final TipPostService tipPostService;

    public TipPostController(ValidationService validationService, TipPostService tipPostService) {
        this.validationService = validationService;
        this.tipPostService = tipPostService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createNewTipPost(@Valid @RequestBody CreateTipPostDto createTipPostDto, BindingResult result, Principal principal) {


        if (result.hasErrors()) {
            return validationService.createFieldErrorResponse(result);
        }

        String username = principal.getName();

        tipPostService.createNewTipPost(createTipPostDto, username);

        return new ResponseEntity<>("Ok", HttpStatus.CREATED);
    }


}
