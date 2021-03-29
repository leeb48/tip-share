package com.projects.tipshare.service;

import com.projects.tipshare.config.GooglePlacesProperties;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class GooglePlacesService {

    private final GooglePlacesProperties googlePlacesProperties;

    public GooglePlacesService(GooglePlacesProperties googlePlacesProperties) {
        this.googlePlacesProperties = googlePlacesProperties;
    }

    /**
     * Retrieve the actual image url by using photoReference given by Google Place API
     *
     * @param photoReference provided by response from PlacesAPI
     * @return actual image url
     */
    public String getImageUrl(String photoReference) {

        WebClient webClient = WebClient.builder()
                .baseUrl("https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + photoReference + "&key=" + googlePlacesProperties.getApiKey())
                .build();

        String htmlResponse = webClient.get().retrieve().bodyToMono(String.class).block();
        String imageUrl = "";

        // parse the html to get the image url
        if (htmlResponse != null) {
            Document doc = Jsoup.parse(htmlResponse);

            Element link = doc.selectFirst("a[href]");

            imageUrl = link.attr("href");
        }


        return imageUrl;
    }

}
