import React, { useState, useEffect } from "react";
import Searchfield from "./components/SearchField";
import Card from "./components/Card";
import Loader from "./components/Loader";
import { fetchCards, getCardsByName } from "./services/cardService";
import { useDeckManager } from "./hooks/useDeckManager";
import DeckCard from "./components/DeckCard";
import ColorFilter from "./components/ColorFilter";
import { getCardsByColor } from "./services/cardService";

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
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const [selectedColor, setSelectedColor] = useState<string>("");

    const {
        deck,
        setDeck,
        deckCounts,
        setDeckCounts,
        deckDrop,
        outsideDrop,
        isOver,
    } = useDeckManager(allCards, searchedResults);

    useEffect(() => {
        const loadCards = async () => {
            setLoading(true);
            try {
                let result: CardType[] = [];
                if (selectedColor !== "") {
                    result = await getCardsByColor(selectedColor, page);
                } else {
                    result = await fetchCards(page);
                }
                setAllCards(result);
                setHasNextPage(result.length > 0);
            } catch (error) {
                alert(error);
            } finally {
                setLoading(false);
            }
        };
        loadCards();
    }, [page, selectedColor]);

    useEffect(() => {
        setPage(0);
        setSearchText("");
    }, [selectedColor]);

    const handleSearchChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        // remove timeout for experiment purposes
        // clearTimeout(searchTimeout);
        const searchTextValue = e.target.value;
        setSearchText(searchTextValue);

        if (searchTextValue) {
            const searchResult = await getCardsByName(searchTextValue);
            setSearchedResults(searchResult);
        } else {
            setSearchedResults([]);
        }

        /* setSearchTimeout(
            setTimeout(async () => {
                if (searchTextValue) {
                    const searchResult = await getCardsByName(searchTextValue);
                    setSearchedResults(searchResult);
                } else {
                    setSearchedResults([]);
                }
            }, 500)
        ); */
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
                        <ColorFilter
                            setSelectedColor={setSelectedColor}
                            selectedColor={selectedColor}
                        />
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
                            {searchText.length > 0 &&
                            searchedResults.length === 0 ? (
                                <div className="text-xl p-4 flex h-screen text-gray-500">
                                    No search results.
                                </div>
                            ) : (
                                renderCards(
                                    searchedResults.length > 0
                                        ? searchedResults
                                        : allCards
                                )
                            )}
                        </div>
                    )}
                    <div className="flex justify-center">
                        <button
                            className={`text-3xl px-4 py-2 mr-2 rounded ${
                                page === 0
                                    ? "bg-gray-200 opacity-50"
                                    : "bg-gray-200"
                            }`}
                            onClick={() => setPage(page - 1)}
                            disabled={page === 0}
                        >
                            ←
                        </button>
                        <button
                            className={`text-3xl px-4 py-2 rounded ${
                                !hasNextPage
                                    ? "bg-gray-200 opacity-50"
                                    : "bg-gray-200"
                            }`}
                            onClick={() => setPage(page + 1)}
                            disabled={!hasNextPage}
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
                            className="text-3xl outline-none font-bold w-full py-1 px-2 rounded"
                            onBlur={(e) => (e.target.style.fontWeight = "bold")}
                            onFocus={(e) =>
                                (e.target.style.fontWeight = "normal")
                            }
                        />
                    </div>
                    <div className="overflow-y-scroll flex-grow">
                        {Array.from(new Set(deck.map((card) => card.id))).map(
                            (id) => {
                                const card = deck.find(
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

                    <div className="mb-2 mt-1 mr-4 ml-4 flex justify-between items-center px-4">
                        <div className="text-2xl">
                            <span>{`${deck.length}/60`}</span>
                        </div>
                        <button className="text-2xl bg-gray-700 text-white py-1 px-4 rounded">
                            Done
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;
