package com.projects.tipshare.controller;

import com.google.maps.GeoApiContext;
import com.google.maps.PlacesApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.PlacesSearchResponse;
import com.projects.tipshare.config.GooglePlacesProperties;
import com.projects.tipshare.controller.dto.PlacesSearchQueryDto;
import com.projects.tipshare.exception.googleapiexcpetion.SearchFailedException;
import com.projects.tipshare.service.ValidationService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/api/places")
public class GooglePlacesController {

    private final ValidationService validationService;
    private final GooglePlacesProperties googlePlacesProperties;

    public GooglePlacesController(ValidationService validationService, GooglePlacesProperties googlePlacesProperties) {
        this.validationService = validationService;
        this.googlePlacesProperties = googlePlacesProperties;
    }

    /**
     * @param queryDto search query term can be either address or place name, but it must have at least one search term
     * @param result   catches any validation errors from request body
     * @return returns the search result along with next page token for pagination if present
     */
    @PostMapping
    @RequestMapping("/search")
    public ResponseEntity<?> searchPlaces(@Valid @RequestBody PlacesSearchQueryDto queryDto, BindingResult result) throws InterruptedException, ApiException, IOException {

        if (result.hasErrors()) {
            return validationService.createObjectErrorResponse(result);
        }

        String placeName = queryDto.getPlaceName();
        String placeAddr = queryDto.getPlaceAddr();

        try {
            GeoApiContext context = new GeoApiContext.Builder()
                    .apiKey(googlePlacesProperties.getApiKey())
                    .build();
            PlacesSearchResponse placesSearchResponse = PlacesApi.textSearchQuery(context, placeName + " " + placeAddr).await();

            return ResponseEntity.ok(placesSearchResponse);

        } catch (Exception e) {
            throw new SearchFailedException("Search failed");
        }
    }
}
