package com.projects.tipshare.security.jwt;

import com.projects.tipshare.model.SecurityUser;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import static com.projects.tipshare.security.SecurityConstants.*;

@Component
public class JWTProvider {

    private final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    public String generateJWT(Authentication authentication, boolean rememberMe) {

        Date now = new Date(System.currentTimeMillis());
        Date expireDate = rememberMe ?
                new Date(now.getTime() + TimeUnit.HOURS.toMillis(JWT_EXPIRATION_TIME)) :
                new Date(now.getTime() + TimeUnit.HOURS.toMillis(JWT_EXPIRATION_TIME_REMEMBER_ME));

        SecurityUser user = (SecurityUser) authentication.getPrincipal();

        return Jwts.builder().setIssuer("TipShare").setSubject("JWT")
                .claim("userId", user.getUserId())
                .claim("username", authentication.getName())
                .claim("authorities", populateAuthorities(authentication.getAuthorities()))
                .setIssuedAt(now)
                .setExpiration(expireDate)
                .signWith(key)
                .compact();
    }

    public boolean validateJWT(String jwt) {

        try {

            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);

            return true;

        } catch (MalformedJwtException ex) {
            System.out.println("Invalid JWT Token");
        } catch (ExpiredJwtException ex) {
            System.out.println("JWT has expired");
        } catch (UnsupportedJwtException ex) {
            System.out.println("Unsupported JWT");
        } catch (IllegalArgumentException ex) {
            System.out.println("JWT claims string is empty");
        }

        return false;
    }

    public String getUsernameFromJWT(String jwt) {

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwt)
                .getBody();


        return String.valueOf(claims.get("username"));

    }

    public String getAuthoritiesFromJWT(String jwt) {

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwt)
                .getBody();

        return (String) claims.get("authorities");

    }

    public String getJWTFromRequestHeader(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(TOKEN_PREFIX)) {
            return bearerToken.substring(7);
        }

        return null;
    }

    private String populateAuthorities(Collection<? extends GrantedAuthority> collection) {
        Set<String> authorities = new HashSet<>();
        for (GrantedAuthority authority : collection) {
            authorities.add(authority.getAuthority());
        }

        return String.join(",", authorities);
    }

}
