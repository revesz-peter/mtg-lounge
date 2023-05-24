package com.codecool.server.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;

import java.sql.Timestamp;
import java.util.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "decks")
public class Deck {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID deckId;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    private Format format;

    @Column
    @CreationTimestamp
    private Timestamp creationDate;

    @ManyToOne
    private User user;

}