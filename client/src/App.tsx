import React, { useState, useEffect } from "react";
import Searchfield from "./components/SearchField";
import Card from "./components/Card";
import Loader from "./components/Loader";
import { fetchCards, getCardsByName } from "./services/cardService";
import { useDeckManager } from './hooks/useDeckManager';
import DeckCard from "./components/DeckCard";

export interface CardType {
    id: string;
    imageUris: string;
    name: string;
}

function App() {
    const [loading, setLoading] = useState<boolean>(false);
    const [allCards, setAllCards] = useState<CardType[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [searchedResults, setSearchedResults] = useState<CardType[]>([]);
    const [searchTimeout, setSearchTimeout] = useState<number | undefined>();

    const { deck, setDeck, deckCounts, setDeckCounts, deckDrop, outsideDrop, isOver } = useDeckManager(allCards);

    useEffect(() => {
        const loadCards = async () => {
            setLoading(true);
            try {
                const result = await fetchCards();
                setAllCards(result);
            } catch (error) {
                alert(error);
            } finally {
                setLoading(false);
            }
        };
        loadCards();
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
                                              const existingCardIndex =
                                                  deck.findIndex(
                                                      (deckCard) =>
                                                          deckCard.id ===
                                                          card.id
                                                  );
                                              if (existingCardIndex > -1) {
                                                  setDeckCounts(
                                                      (prevCounts) => {
                                                          const updatedCounts =
                                                              {
                                                                  ...prevCounts,
                                                                  [card.id]:
                                                                      (prevCounts[
                                                                          card
                                                                              .id
                                                                      ] || 0) +
                                                                      1,
                                                              };
                                                          return updatedCounts;
                                                      }
                                                  );
                                              } else {
                                                  setDeck((prevDeck) => {
                                                      const updatedDeck = [
                                                          ...prevDeck,
                                                          card,
                                                      ];
                                                      return updatedDeck;
                                                  });
                                                  setDeckCounts(
                                                      (prevCounts) => {
                                                          const updatedCounts =
                                                              {
                                                                  ...prevCounts,
                                                                  [card.id]: 1,
                                                              };
                                                          return updatedCounts;
                                                      }
                                                  );
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
                                              const existingCardIndex =
                                                  deck.findIndex(
                                                      (deckCard) =>
                                                          deckCard.id ===
                                                          card.id
                                                  );
                                              if (existingCardIndex > -1) {
                                                  setDeckCounts(
                                                      (prevCounts) => {
                                                          const updatedCounts =
                                                              {
                                                                  ...prevCounts,
                                                                  [card.id]:
                                                                      (prevCounts[
                                                                          card
                                                                              .id
                                                                      ] || 0) +
                                                                      1,
                                                              };
                                                          return updatedCounts;
                                                      }
                                                  );
                                              } else {
                                                  setDeck((prevDeck) => {
                                                      const updatedDeck = [
                                                          ...prevDeck,
                                                          card,
                                                      ];
                                                      return updatedDeck;
                                                  });
                                                  setDeckCounts(
                                                      (prevCounts) => {
                                                          const updatedCounts =
                                                              {
                                                                  ...prevCounts,
                                                                  [card.id]: 1,
                                                              };
                                                          return updatedCounts;
                                                      }
                                                  );
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
