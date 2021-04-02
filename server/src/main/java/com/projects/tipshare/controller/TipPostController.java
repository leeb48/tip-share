package com.projects.tipshare.controller;

import com.projects.tipshare.controller.dto.CreateTipPostDto;
import com.projects.tipshare.controller.dto.EditTipPostDto;
import com.projects.tipshare.exception.serviceException.TipPostNotFoundException;
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


    @GetMapping("/{tipPostId}")
    public ResponseEntity<?> getTipPostByTipPostId(@PathVariable(value = "tipPostId") String tipPostId) {

        TipPost tipPost = tipPostService.getTipPostByTipPostId(Long.valueOf(tipPostId));

        if (tipPost == null) {
            throw new TipPostNotFoundException("Tip post was not found.");
        }

        return new ResponseEntity<>(tipPost, HttpStatus.OK);
    }

    @GetMapping("/place/{placeId}")
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

        return new ResponseEntity<>("Tip Post Created", HttpStatus.CREATED);
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editTipPost(@Valid @RequestBody EditTipPostDto editTipPostDto, BindingResult result, Principal principal) {


        if (result.hasErrors()) {
            return validationService.createFieldErrorResponse(result);
        }

        String username = principal.getName();

        tipPostService.editTipPost(editTipPostDto, username);

        return ResponseEntity.ok("Tip Post Edited");
    }

    @DeleteMapping("/delete/{tipPostId}")
    public ResponseEntity<?> deleteTipPost(@PathVariable(value = "tipPostId") String tipPostId, Principal principal) {

        String username = principal.getName();

        tipPostService.deleteTipPost(tipPostId, username);

        return ResponseEntity.ok("Tip Post Deleted");
    }

}
