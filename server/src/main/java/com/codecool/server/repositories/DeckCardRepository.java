package com.codecool.server.repositories;

import com.codecool.server.model.DeckCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeckCardRepository extends JpaRepository<DeckCard, Long> {}

