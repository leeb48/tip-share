package com.projects.tipshare.repository;

import com.projects.tipshare.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Repository for Place Entity
 */
@Repository
public interface PlaceRepo extends JpaRepository<Place, Long> {

    Optional<Place> findByPlaceIdFromPlacesAPI(String placesIdFromPlacesAPI);
}
