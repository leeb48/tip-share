package com.projects.tipshare.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

/**
 * Place Entity
 */
@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "place", uniqueConstraints = {@UniqueConstraint(columnNames = {"placeIdFromPlacesAPI"})})
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
    private String placeIdFromPlacesAPI;

    private String imageUrl;

    @JsonIgnore
    @OneToMany(mappedBy = "place", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<TipPost> tipPosts = new HashSet<>();
}
