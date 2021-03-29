package com.projects.tipshare.config;

import com.google.maps.GeoApiContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final GooglePlacesProperties googlePlacesProperties;

    public WebConfig(GooglePlacesProperties googlePlacesProperties) {
        this.googlePlacesProperties = googlePlacesProperties;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("*");
    }


    /**
     * Creates the GeoApiContext bean that is used when working with Google Places API
     *
     * @return GeoApiContext with api key
     */
    @Bean
    public GeoApiContext geoApiContext() {
        return new GeoApiContext.Builder()
                .apiKey(googlePlacesProperties.getApiKey())
                .build();
    }
}
