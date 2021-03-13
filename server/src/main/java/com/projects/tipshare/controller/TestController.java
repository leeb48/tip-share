package com.projects.tipshare.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/test")
public class TestController {

    @GetMapping
    public ResponseEntity<?> test() {

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
