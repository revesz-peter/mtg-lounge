package com.codecool.server.repository;

import com.codecool.server.model.Deck;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface DeckRepository extends JpaRepository<Deck, UUID> {}