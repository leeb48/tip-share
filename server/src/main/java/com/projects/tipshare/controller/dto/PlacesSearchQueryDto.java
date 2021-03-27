package com.projects.tipshare.controller.dto;

import com.projects.tipshare.validator.SearchPlacesConstraint;
import lombok.Data;

@Data
@SearchPlacesConstraint(
        placeName = "placeName",
        placeAddr = "placeAddr"
)
public class PlacesSearchQueryDto {
    private String placeName;
    private String placeAddr;
    private String pageToken;
}
