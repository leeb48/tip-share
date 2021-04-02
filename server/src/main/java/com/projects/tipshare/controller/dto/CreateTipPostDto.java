package com.projects.tipshare.controller.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class CreateTipPostDto {

    @NotNull(message = "placeId must not be null")
    @NotBlank(message = "placeId must not be blank")
    private String placeId;

    private String comments;

    private Integer highestAvg;

    private Integer typicalAvg;

    private Integer lowestAvg;
}
