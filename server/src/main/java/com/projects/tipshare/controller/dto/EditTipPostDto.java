package com.projects.tipshare.controller.dto;

import lombok.Data;

import javax.annotation.Nullable;
import javax.validation.constraints.NotNull;

@Data
public class EditTipPostDto {
    @NotNull
    private Long tipPostId;

    @Nullable
    private String editedComment;
    @Nullable
    private Integer editedHighestAvg;
    @Nullable
    private Integer editedTypicalAvg;
    @Nullable
    private Integer editedLowestAvg;
}
