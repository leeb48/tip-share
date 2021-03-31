package com.projects.tipshare.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "place", uniqueConstraints = {@UniqueConstraint(columnNames = {"placeId"})})
public class Place extends BaseEntity {

    @NotBlank
    @NotNull
    private String placeAddr;

    @NotBlank
    @NotNull
    private String placeName;

    @NotBlank
    @NotNull
    private String operational;

    @NotBlank
    @NotNull
    private String placeId;

    private String imageUrl;

    @NotNull
    private Integer highestAvg;

    @NotNull
    private Integer typicalAvg;

    @NotNull
    private Integer lowestAvg;

}
