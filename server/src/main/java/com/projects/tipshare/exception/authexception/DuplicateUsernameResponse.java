package com.projects.tipshare.exception.authexception;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DuplicateUsernameResponse {
    public String duplicateUsername;
}
