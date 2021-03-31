package com.projects.tipshare.exception.serviceException;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoadPlaceDetailFailResponse {
    private String savePlaceFailMessage;
}
