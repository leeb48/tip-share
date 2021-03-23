package com.projects.tipshare.security;

public class SecurityConstants {
    public static final String SECRET = "haoiefoiqwpoeijfapsoindvaouvnqwpoeijfaopsidjfoapisejfoagopiasjef";
    public static final String SIGN_UP_URLS = "/api/auth/**";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String AUTHORIZATION_HEADER = "Authorization";

    // In hours
    public static final long JWT_EXPIRATION_TIME = 1;
    public static final long JWT_EXPIRATION_TIME_REMEMBER_ME = 72;
}
