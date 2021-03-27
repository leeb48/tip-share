package com.projects.tipshare.security.jwt;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class JWTValidateFilter extends OncePerRequestFilter {

    private final JWTProvider jwtProvider;

    public JWTValidateFilter(JWTProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String jwt = jwtProvider.getJWTFromRequestHeader(request);

        System.out.println(jwtProvider.validateJWT(jwt));

        try {

            if (StringUtils.hasText(jwt) && jwtProvider.validateJWT(jwt)) {

                String username = jwtProvider.getUsernameFromJWT(jwt);
                String authorities = jwtProvider.getAuthoritiesFromJWT(jwt);

                // Create valid authentication based on jwt
                Authentication authentication = new UsernamePasswordAuthenticationToken(username, null,
                        AuthorityUtils.commaSeparatedStringToAuthorityList(authorities));


                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

        } catch (Exception e) {
            throw new BadCredentialsException("Invalid JWT");
        }


        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return request.getServletPath().equals("/api/auth/login") | request.getServletPath().equals("/api/auth/register");
    }
}
