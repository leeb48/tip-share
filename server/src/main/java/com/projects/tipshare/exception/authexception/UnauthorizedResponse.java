package com.projects.tipshare.exception.authexception;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UnauthorizedResponse {
    private String unauthorizedMessage;
}
