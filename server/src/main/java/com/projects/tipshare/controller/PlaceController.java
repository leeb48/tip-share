package com.projects.tipshare.controller;

import com.google.maps.model.PlacesSearchResult;
import com.projects.tipshare.exception.serviceException.LoadPlaceDetailFailException;
import com.projects.tipshare.model.Place;
import com.projects.tipshare.service.PlaceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/places")
public class PlaceController {
    private final PlaceService placeService;

    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    /**
     * Retrieves the place info saved in the database if it exists, if place info does not exist then the place
     * is saved in the database and place detail is returned.
     *
     * @param placesSearchResult PlacesAPI search result
     * @return the place info saved in the database
     */
    @PostMapping("/details")
    public ResponseEntity<?> retrievePlaceDetail(@RequestBody PlacesSearchResult placesSearchResult) {

        try {

            Place foundPlace = placeService.getPlacebyPlaceId(placesSearchResult.placeId);

            if (foundPlace != null) {
                return new ResponseEntity<>(foundPlace, HttpStatus.OK);
            } else {
                Place savedPlace = placeService.savePlaceFromPlacesSearchResult(placesSearchResult);

                return new ResponseEntity<>(savedPlace, HttpStatus.OK);
            }
        } catch (Exception e) {
            throw new LoadPlaceDetailFailException(placesSearchResult.name + " failed to load.");
        }
    }

    @GetMapping("/details/{placeId}")
    public ResponseEntity<?> retrievePlaceDetailByPlaceId(@PathVariable(value = "placeId") String placeId) {

        Place foundPlace = placeService.getPlacebyPlaceId(placeId);

        if (foundPlace == null) {
            throw new LoadPlaceDetailFailException("Place with place ID " + placeId + " does not exist.");
        } else {
            return new ResponseEntity<>(foundPlace, HttpStatus.OK);
        }
    }

}
