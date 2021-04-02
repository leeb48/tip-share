package com.projects.tipshare.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * Tip Post Entity
 */
@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class TipPost extends BaseEntity {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "place_id")
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    private Place place;

    @NotNull
    @NotBlank
    private String ownerUsername;

    @NotNull
    private Long ownerUserId;

    @Lob
    private String comments;

    private Integer highestAvg;

    private Integer typicalAvg;

    private Integer lowestAvg;
}
