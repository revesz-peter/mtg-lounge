package com.codecool.server.service;

import com.codecool.server.dto.CardDTO;
import com.codecool.server.model.Card;
import com.codecool.server.repository.CardRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CardService {
    @Autowired
    private CardRepository cardRepository;

    @Transactional(readOnly = true)
    public List<CardDTO> getAllCards(int page) {
        Pageable pageable = PageRequest.of(page, 8); // Fixed page size of 8
        Page<Card> cards = cardRepository.findAll(pageable);
        return cards.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CardDTO> getCardsByColor(String color, int page) {
        int pageSize = 8;
        List<Card> allCards = cardRepository.findByManaCostContaining(color);
        int start = Math.min(page * pageSize, allCards.size());
        int end = Math.min(start + pageSize, allCards.size());
        List<Card> pageCards = allCards.subList(start, end);
        return pageCards.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CardDTO> getCardsByManaCost(String manaCost) {
        List<Card> cards = cardRepository.findByManaCost(manaCost);
        return cards.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CardDTO> getCardsBySet(String set) {
        List<Card> cards = cardRepository.findBySet(set);
        return cards.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CardDTO> getCardsByNameContaining(String name, int page) {
        int pageSize = 8;
        List<Card> allCards = cardRepository.findByNameContainingIgnoreCase(name);
        int start = Math.min(page * pageSize, allCards.size());
        int end = Math.min(start + pageSize, allCards.size());
        List<Card> pageCards = allCards.subList(start, end);
        return pageCards.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private CardDTO convertToDTO(Card card) {
        return new CardDTO(
                card.getId(),
                card.getName(),
                card.getManaCost(),
                card.getOracleText(),
                card.getSet(),
                card.getImageUris());
    }

}
