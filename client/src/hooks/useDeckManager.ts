import { useState } from "react";
import { useDrop } from "react-dnd";
import { CardType } from "../App"

export function useDeckManager(allCards: CardType[], searchedResults: CardType[]){
    const [deck, setDeck] = useState<CardType[]>([]);
    const [deckCounts, setDeckCounts] = useState<{ [id: string]: number }>({});

    // Original drop zone (for adding to the deck)
    const [{ isOver }, deckDrop] = useDrop(
        () => ({
            accept: "card",
            drop: (item: { type: string; id: string }) => {
                const card = allCards.find((card) => card.id === item.id) || searchedResults.find((card) => card.id === item.id);

                if (card) {
                    setDeck((prevDeck) => [...prevDeck, card]);
                    setDeckCounts((prevCounts) => ({
                        ...prevCounts,
                        [card.id]: prevCounts[card.id]
                            ? prevCounts[card.id] + 1
                            : 1,
                    }));
                }
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
            }),
        }),
        [allCards, deck, searchedResults]
    );

    // New drop zone (for removing from the deck)
    const [, outsideDrop] = useDrop(
        () => ({
            accept: "deckCard",
            drop: (item: { type: string; id: string }) => {
                const card = deck.find((deckCard) => deckCard.id === item.id);
                if (card) {
                    setDeck((prevDeck) => {
                        const updatedDeck = [...prevDeck];
                        const cardIndex = updatedDeck.findIndex(
                            (deckCard) => deckCard.id === item.id
                        );
                        if (cardIndex > -1) {
                            updatedDeck.splice(cardIndex, 1);
                        }
                        return updatedDeck;
                    });
                    setDeckCounts((prevCounts) => {
                        if (prevCounts[card.id] && prevCounts[card.id] > 1) {
                            return {
                                ...prevCounts,
                                [card.id]: prevCounts[card.id] - 1,
                            };
                        } else {
                            const { [card.id]: _, ...rest } = prevCounts;
                            return rest;
                        }
                    });
                }
            },
        }),
        [deck]
    );

    return { deck, setDeck, deckCounts, setDeckCounts, deckDrop, outsideDrop, isOver };
}
