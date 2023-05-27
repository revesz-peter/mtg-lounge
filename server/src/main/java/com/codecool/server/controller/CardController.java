package com.codecool.server.controller;

import com.codecool.server.dto.CardDTO;
import com.codecool.server.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
public class CardController {

    @Autowired
    private CardService cardService;

    @GetMapping
    public ResponseEntity<List<CardDTO>> getAllCards() {
        List<CardDTO> cardDTOs = cardService.getAllCards();
        return new ResponseEntity<>(cardDTOs, HttpStatus.OK);
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<List<CardDTO>> getCardsByName(@PathVariable String name) {
        List<CardDTO> cardDTOs = cardService.getCardsByNameContaining(name);
        return new ResponseEntity<>(cardDTOs, HttpStatus.OK);
    }
}
