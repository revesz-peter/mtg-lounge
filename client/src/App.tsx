import React, { useState, useEffect } from "react";
import Searchfield from "./components/SearchField";
import Card from "./components/Card";
import Loader from "./components/Loader";
import { getCardsByName } from "./services/cardService";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchedResults, setSearchedResults] = useState<Card[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<number | undefined>();

/*   useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:8080/api/cards", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

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
  }, []); */

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <section className="max-w-7xl mx-auto flex">
      <div className="w-2/3">
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
            {searchedResults.length ? (
              searchedResults.map((card) => (
                <Card key={card.id} imageUris={card.imageUris} />
              ))
            ) : (
              allCards.map((card) => (
                <Card key={card.id} imageUris={card.imageUris} />
              ))
            )}
          </div>
        )}
      </div>
      <div className="w-1/3 border-2 border-gray-300 h-screen ml-4 m-7">
        {/* This is the future deck slot */}
        {/* You can add cards here */}
      </div>
    </section>
  );
  
}

export default App;