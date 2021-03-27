package com.projects.tipshare.controller;

import com.projects.tipshare.config.GooglePlacesProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/test")
public class TestController {

    private final GooglePlacesProperties googlePlacesProperties;

    public TestController(GooglePlacesProperties googlePlacesProperties) {
        this.googlePlacesProperties = googlePlacesProperties;
    }

    @GetMapping
    public ResponseEntity<?> test() {

        System.out.println(googlePlacesProperties.getApiKey());

        return ResponseEntity.ok("okay");
    }

    @GetMapping("/user")
    public ResponseEntity<?> userRoute() {

        return ResponseEntity.ok("User only");
    }

    @GetMapping("/admin")
    public ResponseEntity<?> adminRoute() {

        return ResponseEntity.ok("Admin only");
    }
}
