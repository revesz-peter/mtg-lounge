package com.codecool.server.controller;

import com.codecool.server.dto.CardDTO;
import com.codecool.server.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
public class CardController {

    @Autowired
    private CardService cardService;
    @GetMapping
    public ResponseEntity<List<CardDTO>> getAllCards(@RequestParam(required = false, defaultValue = "0") int page) {
        List<CardDTO> cardDTOs = cardService.getAllCards(page);
        return new ResponseEntity<>(cardDTOs, HttpStatus.OK);
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<List<CardDTO>> getCardsByName(@PathVariable String name) {
        List<CardDTO> cardDTOs = cardService.getCardsByNameContaining(name);
        return new ResponseEntity<>(cardDTOs, HttpStatus.OK);
    }
}
