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
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TipPostServiceTest {

    @Mock
    TipPostRepo tipPostRepo;

    @Mock
    UserRepo userRepo;

    @Mock
    PlaceRepo placeRepo;

    TipPostService tipPostService;

    @BeforeEach
    void setUp() {
        tipPostService = new TipPostService(tipPostRepo, userRepo, placeRepo);
    }

    @Test
    void createNewTipPostSuccess() {
        // given
        User user = new User();
        user.setUsername("user1");

        Place place = new Place();

        CreateTipPostDto tipPost = new CreateTipPostDto();
        tipPost.setComments("comment");
        tipPost.setPlaceId("12345");

        when(userRepo.findByUsername(anyString())).thenReturn(Optional.of(user));
        when(placeRepo.findByPlaceIdFromPlacesAPI(anyString())).thenReturn(Optional.of(place));

        // when
        tipPostService.createNewTipPost(tipPost, user.getUsername());

        // then
        verify(tipPostRepo, times(1)).save(any(TipPost.class));
    }

    @Test
    void createNewTipPostUserNotFound() {
        // given
        User user = new User();
        user.setUsername("user1");

        Place place = new Place();

        CreateTipPostDto tipPost = new CreateTipPostDto();
        tipPost.setComments("comment");
        tipPost.setPlaceId("12345");

        when(userRepo.findByUsername(anyString())).thenReturn(Optional.empty());

        // when
        Assertions.assertThrows(UserNotFoundException.class, () -> {
            tipPostService.createNewTipPost(tipPost, user.getUsername());
        });
    }


    @Test
    void createNewTipPostPlaceNotFound() {
        // given
        User user = new User();
        user.setUsername("user1");

        Place place = new Place();

        CreateTipPostDto tipPost = new CreateTipPostDto();
        tipPost.setComments("comment");
        tipPost.setPlaceId("12345");

        when(userRepo.findByUsername(anyString())).thenReturn(Optional.of(user));
        when(placeRepo.findByPlaceIdFromPlacesAPI(anyString())).thenReturn(Optional.empty());

        // when
        Assertions.assertThrows(PlaceNotFoundException.class, () -> {
            tipPostService.createNewTipPost(tipPost, user.getUsername());
        });
    }
}