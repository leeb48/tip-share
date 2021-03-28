package com.projects.tipshare.controller;

import com.projects.tipshare.config.GooglePlacesProperties;
import com.projects.tipshare.controller.dto.PlacesSearchQueryDto;
import com.projects.tipshare.model.googleplaces.GooglePlacesResponse;
import com.projects.tipshare.service.ValidationService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/places")
public class GooglePlacesController {
    //https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Sydney&key=YOUR_API_KEY

    private final ValidationService validationService;
    private final GooglePlacesProperties googlePlacesProperties;

    public GooglePlacesController(ValidationService validationService, GooglePlacesProperties googlePlacesProperties) {
        this.validationService = validationService;
        this.googlePlacesProperties = googlePlacesProperties;
    }

    @PostMapping
    public ResponseEntity<?> searchPlaces(@Valid @RequestBody PlacesSearchQueryDto queryDto, BindingResult result) {

        if (result.hasErrors()) {

            return validationService.createObjectErrorResponse(result);

        }

        String apiKey = googlePlacesProperties.getApiKey();
        String baseURL = googlePlacesProperties.getBaseURL();
        String pageToken = queryDto.getPageToken();

        // build search query
        String searchQuery = "/json?query="
                + queryDto.getPlaceName()
                + " " + queryDto.getPlaceAddr()
                + "&key=" + apiKey
                + "&pagetoken=" + pageToken;

        WebClient webClient = WebClient.builder()
                .baseUrl(baseURL)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        GooglePlacesResponse res = webClient.get()
                .uri(searchQuery)
                .retrieve()
                .bodyToMono(GooglePlacesResponse.class)
                .block();


        return ResponseEntity.ok(res);
    }
}
