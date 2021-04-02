package com.projects.tipshare.service;

import com.google.maps.model.PlacesSearchResult;
import com.projects.tipshare.model.Place;
import com.projects.tipshare.repository.PlaceRepo;
import org.springframework.stereotype.Service;

@Service
public class PlaceService {

    private final PlaceRepo placeRepo;

    public PlaceService(PlaceRepo placeRepo) {
        this.placeRepo = placeRepo;
    }

    public Place getPlacebyPlaceId(String placeId) {
        return placeRepo.findByPlaceId(placeId).orElse(null);
    }

    /**
     * Creates and saves the place created from a search result given by Google PlacesAPI
     *
     * @param searchResult a search result from PlacesAPI
     * @return the place object in the database
     */
    public Place savePlaceFromPlacesSearchResult(PlacesSearchResult searchResult) {

        try {

            Place newPlace = new Place();
            newPlace.setPlaceAddr(searchResult.formattedAddress);
            newPlace.setPlaceName(searchResult.name);
            newPlace.setPlaceId(searchResult.placeId);
            newPlace.setOperational(searchResult.businessStatus);
            if (searchResult.photos != null) {

                newPlace.setImageUrl(searchResult.photos[0].photoReference);
            } else {
                newPlace.setImageUrl(null);
            }

            return placeRepo.save(newPlace);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
}
