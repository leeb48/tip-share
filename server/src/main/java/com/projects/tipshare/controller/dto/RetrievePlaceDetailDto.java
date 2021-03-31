package com.projects.tipshare.controller.dto;

import com.google.maps.model.PlacesSearchResult;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class RetrievePlaceDetailDto {

    @NotNull
    PlacesSearchResult searchResult;
}
