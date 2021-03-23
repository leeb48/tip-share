package com.projects.tipshare.config;

import com.projects.tipshare.security.AuthoritiesConstants;
import com.projects.tipshare.security.jwt.JWTProvider;
import com.projects.tipshare.security.jwt.JWTValidateFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;

@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    private final JWTProvider jwtProvider;

    public SecurityConfig(JWTProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().configurationSource(new CorsConfigurationSource() {
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(Collections.singletonList("*"));
                config.setAllowedMethods(Collections.singletonList("*"));
                config.setAllowCredentials(true);
                config.setMaxAge(3600L);
                return config;
            }
        }).and()

                .addFilterAfter(new JWTValidateFilter(jwtProvider), BasicAuthenticationFilter.class)

                .csrf().disable()

                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                .authorizeRequests()
                .mvcMatchers("/api/auth/register").permitAll()
                .mvcMatchers("/api/auth/login").permitAll()
                .mvcMatchers("/api/test/admin").hasRole(AuthoritiesConstants.ADMIN)
                .mvcMatchers("/api/test/user").hasRole(AuthoritiesConstants.USER)
                .anyRequest().authenticated()
                .and()
                .httpBasic();
    }
}
