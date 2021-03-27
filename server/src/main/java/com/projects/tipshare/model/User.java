package com.projects.tipshare.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

/**
 * User Model
 */

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "users", uniqueConstraints = {@UniqueConstraint(columnNames = {"username"})})
public class User extends BaseEntity {

    @NotNull(message = "Username is required")
    private String username;

    @NotNull(message = "Password is required")
    @JsonIgnore
    private String password;

    @NotNull
    @Column(nullable = false)
    private boolean activated = false;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_authority",
            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "name")}
    )
    @BatchSize(size = 20)
    private Set<Authority> authorities = new HashSet<>();


}
