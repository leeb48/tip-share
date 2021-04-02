package com.projects.tipshare.service;

import com.projects.tipshare.controller.dto.CreateTipPostDto;
import com.projects.tipshare.exception.serviceException.PlaceNotFoundException;
import com.projects.tipshare.exception.serviceException.UserNotFoundException;
import com.projects.tipshare.model.Place;
import com.projects.tipshare.model.TipPost;
import com.projects.tipshare.model.User;
import com.projects.tipshare.repository.PlaceRepo;
import com.projects.tipshare.repository.TipPostRepo;
import com.projects.tipshare.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service for Tip Post
 */
@Service
public class TipPostService {

    private final TipPostRepo tipPostRepo;
    private final UserRepo userRepo;
    private final PlaceRepo placeRepo;

    public TipPostService(TipPostRepo tipPostRepo, UserRepo userRepo, PlaceRepo placeRepo) {
        this.tipPostRepo = tipPostRepo;
        this.userRepo = userRepo;
        this.placeRepo = placeRepo;
    }

    public void createNewTipPost(CreateTipPostDto createTipPostDto, String username) {

        Optional<User> userOptional = userRepo.findByUsername(username);

        if (!userOptional.isPresent()) {
            throw new UserNotFoundException(username + " was not found.");
        }

        String placeId = createTipPostDto.getPlaceId();

        Optional<Place> placeOptional = placeRepo.findByPlaceId(placeId);

        if (!placeOptional.isPresent()) {
            throw new PlaceNotFoundException("Place with ID: " + placeId + " was not found.");
        }

        User user = userOptional.get();
        Place place = placeOptional.get();

        TipPost newTipPost = new TipPost();
        newTipPost.setComments(createTipPostDto.getComments());
        newTipPost.setHighestAvg(createTipPostDto.getHighestAvg());
        newTipPost.setTypicalAvg(createTipPostDto.getTypicalAvg());
        newTipPost.setLowestAvg(createTipPostDto.getLowestAvg());

        newTipPost.setUser(user);
        newTipPost.setPlace(place);

        tipPostRepo.save(newTipPost);
    }
}
