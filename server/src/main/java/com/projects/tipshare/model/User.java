package com.projects.tipshare.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.Set;

/**
 * User Model
 */

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "users")
public class User extends BaseEntity {

    private final Set<? extends GrantedAuthority> grantedAuthorities;
    @NotNull(message = "Username is required")
    private String username;
    @NotNull(message = "Password is required")
    @JsonIgnore
    private String password;
    @NotNull
    @Column(nullable = false)
    private boolean activated = false;

    public boolean isActivated() {
        return activated;
    }

}
