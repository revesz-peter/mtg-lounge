package com.codecool.server.repository;

import com.codecool.server.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, String> {
    List<Card> findByNameContainingIgnoreCase(String name);
    List<Card> findByManaCostContaining(String manaCost);
    List<Card> findByManaCost(String manaCost);
    List<Card> findBySet(String set);
    
}
