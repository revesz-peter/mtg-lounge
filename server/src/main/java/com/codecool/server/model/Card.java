package com.codecool.server.model;

import java.util.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "cards")
public class Card {
    @Id
    private String id;

    @Column
    private String name;

    @Column
    private String manaCost;

    @Column(length = 1024) // Length increased for potentially long card descriptions
    private String oracleText;

    @Column
    private String set;

    @Column
    private String imageUris;

    @OneToMany(mappedBy = "card", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DeckCard> deckCards = new ArrayList<>();
}
