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
                  [card.id]: prevCounts[card.id] ? prevCounts[card.id] + 1 : 1,
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
            accept: "deckCard",
            drop: (item: { type: string; id: string }) => {
              setDeck((prevDeck) => prevDeck.filter((card) => card.id !== item.id));
              setDeckCounts((prevCounts) => {
                  if (prevCounts[item.id] && prevCounts[item.id] > 1) {
                      return {
                          ...prevCounts,
                          [item.id]: prevCounts[item.id] - 1,
                      };
                  } else {
                      const { [item.id]: _, ...rest } = prevCounts;
                      return rest;
                  }
              });
          }
        }),
        [deck]
    );

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
                                      />
                                  ))
                                : allCards.map((card) => (
                                      <Card
                                          key={card.id}
                                          imageUris={card.imageUris}
                                          id={card.id}
                                          name={card.name}
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
