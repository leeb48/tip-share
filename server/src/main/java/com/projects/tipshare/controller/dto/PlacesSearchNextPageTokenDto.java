package com.projects.tipshare.controller.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class PlacesSearchNextPageTokenDto {

    @NotEmpty
    @NotNull
    private String nextPageToken;
}
