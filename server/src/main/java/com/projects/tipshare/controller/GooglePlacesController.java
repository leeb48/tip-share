package com.projects.tipshare.controller;

import com.projects.tipshare.controller.dto.PlacesSearchQueryDto;
import com.projects.tipshare.service.ValidationService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/places")
public class GooglePlacesController {
    //https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Sydney&key=YOUR_API_KEY

    private final ValidationService validationService;

    public GooglePlacesController(ValidationService validationService) {
        this.validationService = validationService;
    }

    @PostMapping
    public ResponseEntity<?> searchPlaces(@Valid @RequestBody PlacesSearchQueryDto queryDto, BindingResult result) {

        if (result.hasErrors()) {

            return validationService.createObjectErrorResponse(result);

        }


        return ResponseEntity.ok("ok");
    }
}
