package com.projects.tipshare.controller;

import com.projects.tipshare.controller.dto.PlacesSearchQueryDto;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/places")
public class GooglePlacesController {
    //https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Sydney&key=YOUR_API_KEY

    @PostMapping
    public ResponseEntity<?> searchPlaces(@Valid PlacesSearchQueryDto queryDto, BindingResult result) {

        System.out.println(result.getFieldErrors().toString());

        return ResponseEntity.ok("ok");
    }
}
