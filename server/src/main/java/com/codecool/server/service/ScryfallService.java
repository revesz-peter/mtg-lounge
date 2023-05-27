package com.codecool.server.service;

import com.codecool.server.model.Card;
import com.codecool.server.repository.CardRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class ScryfallService {
    @Autowired
    private CardRepository cardRepository;
    private static final RestTemplate restTemplate = new RestTemplate();

    @PostConstruct
    public void fetchAndSaveLightningStrike() {
        final String url = "https://api.scryfall.com/cards/named?exact=lightningstrike";
        Map<String,Object> cardData = restTemplate.getForObject(url, Map.class);

        if (cardData != null) {
            Card card = new Card();
            card.setId((String) cardData.get("id"));
            card.setName((String) cardData.get("name"));
            card.setManaCost((String) cardData.get("mana_cost"));
            card.setOracleText((String) cardData.get("oracle_text"));
            card.setSet((String) cardData.get("set"));
            Map<String, String> imageUris = (Map<String, String>) cardData.get("image_uris");
            card.setImageUris(imageUris.get("normal")); // Get the 'normal' image URI
            cardRepository.save(card);
        }
    }
    public void fetchAndSaveDMUCards() {
        try {
            String url = "https://api.scryfall.com/cards/search?q=name:birds%20of%20paradise%20cheapest:usd";
            fetchAndSaveCards(url);
        } catch (Exception e) {
            // Log the exception to get more details about the error
            e.printStackTrace();
        }
    }

    private void fetchAndSaveCards(String url) {
        do {
            ResponseEntity<Map> responseEntity = restTemplate.getForEntity(url, Map.class);

            if (responseEntity.getStatusCode() == HttpStatus.NOT_FOUND) {
                break;
            }

            Map<String, Object> response = responseEntity.getBody();

            List<Map<String, Object>> cardsData = (List<Map<String, Object>>) response.get("data");
            if (cardsData != null) {
                for (Map<String, Object> cardData : cardsData) {
                    Card card = convertToEntity(cardData);
                    cardRepository.save(card);
                }
            }
            // Check if the response contains 'has_more' field
            if (response.containsKey("has_more") && (Boolean) response.get("has_more")) {
                url = (String) response.get("next_page");
            } else {
                break;
            }
        } while (true);
    }

    private Card convertToEntity(Map<String, Object> cardData) {
        Card card = new Card();
        card.setId((String) cardData.get("id"));
        card.setName((String) cardData.get("name"));
        card.setManaCost((String) cardData.get("mana_cost"));
        card.setOracleText((String) cardData.get("oracle_text"));
        card.setSet((String) cardData.get("set"));
        Map<String, String> imageUris = (Map<String, String>) cardData.get("image_uris");
        if (imageUris != null) {
            card.setImageUris(imageUris.get("normal")); // Get the 'normal' image URI
        }
        return card;
    }
}

