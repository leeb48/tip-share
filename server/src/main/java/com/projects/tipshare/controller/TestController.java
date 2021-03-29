package com.projects.tipshare.controller;

import com.google.maps.errors.ApiException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("api/test")
public class TestController {


    @GetMapping
    public ResponseEntity<?> test() throws InterruptedException, ApiException, IOException {


        return ResponseEntity.ok("ok");
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
