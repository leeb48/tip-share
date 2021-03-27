package com.projects.tipshare.controller.dto;

import com.projects.tipshare.validator.SearchPlacesQueryConstraint;
import lombok.Data;

@Data
@SearchPlacesQueryConstraint(
        placeName = "placeName",
        placeAddr = "placeAddr",
        message = "must have at least one search field"
)
public class PlacesSearchQueryDto {

    private String placeName;
    private String placeAddr;
    private String pageToken;
}
