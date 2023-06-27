package com.codecool.server.service;

import com.codecool.server.model.Card;
import com.codecool.server.repository.CardRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class ScryfallService {
    public static final String URL = "https://api.scryfall.com/cards/search?q=set:dmu&order=cmc";
    @Autowired
    private CardRepository cardRepository;
    private static final RestTemplate restTemplate = new RestTemplate();

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

    public void fetchAndSavePrismaticStrands() {
        final String url = "https://api.scryfall.com/cards/named?exact=prismaticstrands";
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

    public void fetchAndSaveExperimentalSynthesizer() {
        final String url = "https://api.scryfall.com/cards/named?exact=experimentalsynthesizer";
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

    @PostConstruct
    public void fetchAndSaveSetCards() {

        try {
            List<Map<String, Object>> cardsData = new ArrayList<>();
            int page = 1;
            int pageSize = 271; //total number of cards in the set

            //fetch all pages of cards
            while (cardsData.size() < pageSize) {
                String pageUrl = URL + "&page=" + page;
                Map<String, Object> pageData = restTemplate.getForObject(pageUrl, Map.class);
                List<Map<String, Object>> pageCardsData = (List<Map<String, Object>>) pageData.get("data");
                if (pageCardsData != null) {
                    cardsData.addAll(pageCardsData);
                }
                page++;
            }

            //save cards to the database
            for (Map<String, Object> cardData : cardsData) {
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
                cardRepository.save(card);
            }
        } catch (HttpClientErrorException e) {
            System.out.println("Error fetching cards: " + e.getMessage());
        }
    }

}

