import axios from "axios";

export const getCardsByName = async (name: string) => {
    try {
        const response = await axios.get(
            `http://localhost:8080/api/cards/search/${name}`
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching cards: ${error}`);
    }
};
