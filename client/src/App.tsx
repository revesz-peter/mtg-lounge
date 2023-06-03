import React, { useState, useEffect } from "react";
import Searchfield from "./components/SearchField";
import Card from "./components/Card";
import Loader from "./components/Loader";
import { fetchCards, getCardsByName } from "./services/cardService";
import { useDeckManager } from "./hooks/useDeckManager";
import DeckCard from "./components/DeckCard";
import ColorFilter from "./components/ColorFilter";

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
    const [page, setPage] = useState(0);

    const {
        deck,
        setDeck,
        deckCounts,
        setDeckCounts,
        deckDrop,
        outsideDrop,
        isOver,
    } = useDeckManager(allCards);

    useEffect(() => {
        const loadCards = async () => {
            setLoading(true);
            try {
                const result = await fetchCards(page);
                setAllCards(result);
            } catch (error) {
                alert(error);
            } finally {
                setLoading(false);
            }
        };
        loadCards();
    }, [page]);

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

    const addToDeck = (card: CardType) => {
        setDeck((prevDeck) => {
            const updatedDeck = [...prevDeck, card];
            return updatedDeck;
        });
        setDeckCounts((prevCounts) => {
            const updatedCounts = {
                ...prevCounts,
                [card.id]: (prevCounts[card.id] || 0) + 1,
            };
            return updatedCounts;
        });
    };

    const renderCards = (cards: CardType[]) => {
        return cards.map((card) => (
            <Card
                key={card.id}
                imageUris={card.imageUris}
                id={card.id}
                name={card.name}
                addToDeck={addToDeck}
            />
        ));
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
                        <ColorFilter />
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
                        <div className="flex items-center justify-center h-screen">
                            <Loader />
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {searchedResults.length
                                ? renderCards(searchedResults)
                                : renderCards(allCards)}
                        </div>
                    )}
                    <div className="flex justify-center">
                        <button
                            className="text-2xl px-4 py-2 mr-2 rounded bg-gray-200"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 0}
                        >
                            ←
                        </button>
                        <button
                            className="text-2xl px-4 py-2 rounded bg-gray-200"
                            onClick={() => setPage(page + 1)}
                        >
                            →
                        </button>
                    </div>
                </div>
                <div
                    ref={deckDrop}
                    style={{ backgroundColor: isOver ? "lightblue" : "white" }}
                    className="w-1/3 border-2 border-gray-300 h-screen max-h-[90vh] ml-4 m-7 flex flex-col rounded"
                >
                    <div className="mt-2 mb-1 flex justify-center items-center px-4">
                        <input
                            type="text"
                            placeholder="New Deck"
                            className="text-xl font-bold w-full py-1 px-2 rounded"
                            onBlur={(e) => (e.target.style.fontWeight = "bold")}
                            onFocus={(e) =>
                                (e.target.style.fontWeight = "normal")
                            }
                        />
                    </div>
                    <div className="overflow-y-scroll flex-grow">
                        {Array.from(new Set(deck.map((card) => card.id))).map(
                            (id) => {
                                const card = allCards.find(
                                    (card) => card.id === id
                                );
                                return card ? (
                                    <DeckCard
                                        key={card.id}
                                        imageUris={card.imageUris}
                                        id={card.id}
                                        name={card.name}
                                        count={deckCounts[id]}
                                    />
                                ) : null;
                            }
                        )}
                    </div>

                    <div className="mb-2 mt-1 flex justify-between items-center px-4">
                        <div className="text-xl">
                            <span>{`${deck.length}/60`}</span>
                        </div>
                        <button className="text-xl bg-gray-700 text-white py-1 px-2 rounded">
                            Done
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;
