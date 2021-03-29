package com.projects.tipshare.controller;

import com.google.maps.GeoApiContext;
import com.google.maps.PlacesApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.PlacesSearchResponse;
import com.google.maps.model.PlacesSearchResult;
import com.projects.tipshare.controller.dto.PlacesSearchNextPageTokenDto;
import com.projects.tipshare.controller.dto.PlacesSearchQueryDto;
import com.projects.tipshare.exception.googleapiexcpetion.SearchFailedException;
import com.projects.tipshare.service.GooglePlacesService;
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
    private final GeoApiContext context;
    private final GooglePlacesService googlePlacesService;

    public GooglePlacesController(ValidationService validationService, GeoApiContext context, GooglePlacesService googlePlacesService) {
        this.validationService = validationService;
        this.context = context;
        this.googlePlacesService = googlePlacesService;
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
            PlacesSearchResponse placesSearchResponse = PlacesApi.textSearchQuery(context, placeName + " " + placeAddr).await();


            PlacesSearchResponse searchResponseWithImageUrl = attachImagesToResponse(placesSearchResponse);

            return ResponseEntity.ok(searchResponseWithImageUrl);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SearchFailedException("Search failed");
        }
    }


    /**
     * Load the next page of 20 more search result items from the same search term
     *
     * @param nextPageTokenDto token provided by google to load the next page
     * @param result           catches any validation errors from request body
     * @return returns the next page of results
     */
    @PostMapping
    @RequestMapping("/search/next-page")
    public ResponseEntity<?> getNextPage(@Valid @RequestBody PlacesSearchNextPageTokenDto nextPageTokenDto, BindingResult result) {

        if (result.hasErrors()) {
            return validationService.createObjectErrorResponse(result);
        }

        String nextPageToken = nextPageTokenDto.getNextPageToken();

        try {

            PlacesSearchResponse nextPageResponse = PlacesApi.textSearchNextPage(context, nextPageToken).await();

            PlacesSearchResponse nextPageResponseWithImageUrl = attachImagesToResponse(nextPageResponse);

            return ResponseEntity.ok(nextPageResponseWithImageUrl);

        } catch (Exception e) {
            e.printStackTrace();

            throw new SearchFailedException("Next Page Load Failed");
        }

    }

    /**
     * Takes the search response from Google Places API and replaces the photo reference with
     * the actual url of the place images
     *
     * @param searchResponse the PlacesSearchResponse received from making search query to PlacesAPI
     * @return the PlacesSearchResponse with actual image urls
     */
    private PlacesSearchResponse attachImagesToResponse(PlacesSearchResponse searchResponse) {
        // replace the photoReferences with actual image urls
        for (PlacesSearchResult place : searchResponse.results) {
            if (place != null && place.photos != null) {

                place.photos[0].photoReference = googlePlacesService.getImageUrl(place.photos[0].photoReference);
            }
        }

        return searchResponse;
    }
}
