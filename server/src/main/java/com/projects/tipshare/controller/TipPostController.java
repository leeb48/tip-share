package com.projects.tipshare.controller;

import com.projects.tipshare.controller.dto.CreateTipPostDto;
import com.projects.tipshare.model.TipPost;
import com.projects.tipshare.service.TipPostService;
import com.projects.tipshare.service.ValidationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Set;

@RestController
@RequestMapping("/api/tip-post")
public class TipPostController {

    private final ValidationService validationService;
    private final TipPostService tipPostService;

    public TipPostController(ValidationService validationService, TipPostService tipPostService) {
        this.validationService = validationService;
        this.tipPostService = tipPostService;
    }

    @GetMapping("/{placeId}")
    public ResponseEntity<?> getTipPostByPlaceId(@PathVariable(value = "placeId") String placeId) {

        Set<TipPost> foundPosts = tipPostService.getTipPostsByPlaceId(Long.valueOf(placeId));

        return new ResponseEntity<>(foundPosts, HttpStatus.OK);
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
