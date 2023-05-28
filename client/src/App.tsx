import React, { useState, useEffect } from "react";
import Searchfield from "./components/SearchField";
import Card from "./components/Card";
import Loader from "./components/Loader";
import { useDrop } from "react-dnd";
import { getCardsByName } from "./services/cardService";
import DeckCard from "./components/DeckCard";

export interface CardType {
    id: string;
    imageUris: string;
    name: string;
}

function App() {
    const [loading, setLoading] = useState<boolean>(false);
    const [allCards, setAllCards] = useState<CardType[]>([]);
    const [deck, setDeck] = useState<CardType[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [searchedResults, setSearchedResults] = useState<CardType[]>([]);
    const [searchTimeout, setSearchTimeout] = useState<number | undefined>();
    const [deckCounts, setDeckCounts] = useState<{ [id: string]: number }>({});

    useEffect(() => {
        const fetchCards = async () => {
            setLoading(true);

            try {
                const response = await fetch(
                    "http://localhost:8080/api/cards",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.ok) {
                    const result = await response.json();
                    setAllCards(result);
                }
            } catch (error) {
                alert(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    const handleSearchChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        clearTimeout(searchTimeout);
        const searchTextValue = e.target.value;
        setSearchText(searchTextValue);

        setSearchTimeout(
            setTimeout(async () => {
                if (searchTextValue) {
                    const searchResult = await getCardsByName(searchTextValue);
                    setSearchedResults(searchResult);
                } else {
                    setSearchedResults([]);
                }
            }, 500)
        );
    };

    // Original drop zone (for adding to the deck)
    const [{ isOver }, deckDrop] = useDrop(
        () => ({
            accept: "card",
            drop: (item: { type: string; id: string }) => {
                const card = allCards.find((card) => card.id === item.id);
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
        [allCards, deck]
    );

    // New drop zone (for removing from the deck)
    const [, outsideDrop] = useDrop(
      () => ({
        accept: 'deckCard',
        drop: (item: { type: string, id: string }) => {
          const card = deck.find((deckCard) => deckCard.id === item.id);
          if (card) {
            setDeck((prevDeck) => {
              const updatedDeck = [...prevDeck];
              const cardIndex = updatedDeck.findIndex((deckCard) => deckCard.id === item.id);
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

    useEffect(() => {
        console.log(deck);
    }, [deck]);

    return (
        <div
            ref={outsideDrop}
            className="h-screen w-screen absolute top-0 left-0"
        >
            <section className="max-w-7xl mx-auto flex">
                <div className="w-4/5">
                    <div className="mt-5">
                        <Searchfield
                            labelName="Search cards"
                            type="text"
                            name="text"
                            placeholder="Search cards"
                            value={searchText}
                            handleChange={handleSearchChange}
                        />
                    </div>

                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {searchedResults.length
                                ? searchedResults.map((card) => (
                                      <Card
                                          key={card.id}
                                          imageUris={card.imageUris}
                                          id={card.id}
                                          name={card.name}
                                          addToDeck={(card: CardType) => {
                                            const existingCardIndex = deck.findIndex((deckCard) => deckCard.id === card.id);
                                            if (existingCardIndex > -1) {
                                              setDeckCounts((prevCounts) => {
                                                const updatedCounts = { ...prevCounts, [card.id]: (prevCounts[card.id] || 0) + 1 };
                                                return updatedCounts;
                                              });
                                            } else {
                                              setDeck((prevDeck) => {
                                                const updatedDeck = [...prevDeck, card];
                                                return updatedDeck;
                                              });
                                              setDeckCounts((prevCounts) => {
                                                const updatedCounts = { ...prevCounts, [card.id]: 1 };
                                                return updatedCounts;
                                              });
                                            }
                                          }}
                                      />
                                  ))
                                : allCards.map((card) => (
                                      <Card
                                          key={card.id}
                                          imageUris={card.imageUris}
                                          id={card.id}
                                          name={card.name}
                                          addToDeck={(card: CardType) => {
                                            const existingCardIndex = deck.findIndex((deckCard) => deckCard.id === card.id);
                                            if (existingCardIndex > -1) {
                                              setDeckCounts((prevCounts) => {
                                                const updatedCounts = { ...prevCounts, [card.id]: (prevCounts[card.id] || 0) + 1 };
                                                return updatedCounts;
                                              });
                                            } else {
                                              setDeck((prevDeck) => {
                                                const updatedDeck = [...prevDeck, card];
                                                return updatedDeck;
                                              });
                                              setDeckCounts((prevCounts) => {
                                                const updatedCounts = { ...prevCounts, [card.id]: 1 };
                                                return updatedCounts;
                                              });
                                            }
                                          }}
                                      />
                                  ))}
                        </div>
                    )}
                </div>
                <div
                    ref={deckDrop}
                    style={{ backgroundColor: isOver ? "lightblue" : "white" }}
                    className="w-1/3 border-2 border-gray-300 h-screen ml-4 m-7"
                >
                    {Object.entries(deckCounts).map(([id, count]) => {
                        const card = allCards.find((card) => card.id === id);
                        return card ? (
                            <DeckCard
                                key={card.id}
                                imageUris={card.imageUris}
                                id={card.id}
                                name={card.name}
                                count={count}
                            />
                        ) : null;
                    })}
                </div>
            </section>
        </div>
    );
}

export default App;
