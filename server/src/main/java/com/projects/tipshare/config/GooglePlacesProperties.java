package com.projects.tipshare.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "google-places")
@Data
public class GooglePlacesProperties {
    private String apiKey;
}
