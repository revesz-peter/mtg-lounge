package com.codecool.server.service;

import com.codecool.server.model.Card;
import com.codecool.server.repository.CardRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class ScryfallService {
    @Autowired
    private CardRepository cardRepository;

    @PostConstruct
    public void fetchAndSaveLightningStrike() {
        final String url = "https://api.scryfall.com/cards/named?exact=lightningstrike";
        RestTemplate restTemplate = new RestTemplate();
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
}
