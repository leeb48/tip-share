package com.projects.tipshare.controller.dto;

import com.projects.tipshare.validator.SearchPlacesQueryConstraint;
import lombok.Data;

@Data
@SearchPlacesQueryConstraint(
        placeName = "placeName",
        placeAddr = "placeAddr"
)
public class PlacesSearchQueryDto {

    private String placeName;
    private String placeAddr;
}
