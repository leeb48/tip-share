package com.projects.tipshare.service;

import com.projects.tipshare.controller.dto.CreateTipPostDto;
import com.projects.tipshare.controller.dto.EditTipPostDto;
import com.projects.tipshare.exception.authexception.UnauthorizedException;
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
import java.util.Set;

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

    /**
     * Retrieves all the tip post that belongs to a place
     *
     * @param placeId id of the place that the tip posts belong to
     * @return a set of all tip posts that belong to a place
     */
    public Set<TipPost> getTipPostsByPlaceId(Long placeId) {

        return tipPostRepo.findByPlaceId(placeId);
    }

    /**
     * Returns a single tip post with the given id
     *
     * @param tipPostId
     * @return a single tip post
     */
    public TipPost getTipPostByTipPostId(Long tipPostId) {
        return tipPostRepo.findById(tipPostId).orElse(null);
    }

    /**
     * Deletes a tip post with the given id only if that request is being
     * made by the owner of the tip post
     *
     * @param tipPostId post to be deleted
     * @param username  the owner of the tip post
     */
    public void deleteTipPost(String tipPostId, String username) {

        Optional<TipPost> tipPost = tipPostRepo.findById(Long.valueOf(tipPostId));

        tipPost.ifPresent(currTipPost -> {

            if (!currTipPost.getOwnerUsername().equals(username)) {
                throw new UnauthorizedException("Not authorized to delete this tip post");
            }

            tipPostRepo.delete(currTipPost);
        });
    }


    /**
     * This service edits an existing tip post. The tip post must belong to the
     * authenticated user with the given username.
     *
     * @param editTipPostDto data used to update the post
     * @param username       the user that the tip post belongs to
     */
    public void editTipPost(EditTipPostDto editTipPostDto, String username) {

        Optional<TipPost> tipPost = tipPostRepo.findById(editTipPostDto.getTipPostId());

        tipPost.ifPresent(currTipPost -> {

            if (!currTipPost.getOwnerUsername().equals(username)) {
                throw new UnauthorizedException("Not authorized to edit this post");
            }

            // only update if the edited data is present, otherwise don't update
            if (editTipPostDto.getEditedComment() != null) {
                currTipPost.setComments(editTipPostDto.getEditedComment());
            }
            if (editTipPostDto.getEditedHighestAvg() != null) {
                currTipPost.setHighestAvg(editTipPostDto.getEditedHighestAvg());
            }
            if (editTipPostDto.getEditedTypicalAvg() != null) {
                currTipPost.setTypicalAvg(editTipPostDto.getEditedTypicalAvg());
            }
            if (editTipPostDto.getEditedLowestAvg() != null) {
                currTipPost.setLowestAvg(editTipPostDto.getEditedLowestAvg());
            }

            tipPostRepo.save(currTipPost);
        });
    }

    /**
     * Create a new tip post with given data. A new tip post must belong to a user and a place.
     *
     * @param createTipPostDto data passed in to create a new post
     * @param username         the user that the tip post will belong to
     */
    public void createNewTipPost(CreateTipPostDto createTipPostDto, String username) {

        Optional<User> userOptional = userRepo.findByUsername(username);

        if (!userOptional.isPresent()) {
            throw new UserNotFoundException(username + " was not found.");
        }

        String placeId = createTipPostDto.getPlaceId();

        Optional<Place> placeOptional = placeRepo.findByPlaceIdFromPlacesAPI(placeId);

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
        newTipPost.setOwnerUserId(user.getId());
        newTipPost.setOwnerUsername(user.getUsername());

        newTipPost.setPlace(place);

        tipPostRepo.save(newTipPost);
    }
}
