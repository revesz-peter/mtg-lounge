import { useDrag } from "react-dnd";
import { CardType } from "../App";

interface CardProps {
    id: string;
    imageUris: string;
    name: string;
    addToDeck: (card: CardType) => void;
}

const Card: React.FC<CardProps> = ({ id, imageUris, name, addToDeck }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "card",
        item: { id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const handleClick = () => {
        addToDeck({ id, imageUris, name });
    };

    return (
        <div
            ref={drag}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className="flex flex-col items-center p-2 transition-all duration-300 transform hover:scale-105"
            onClick={() => handleClick()}
        >
            <img
                src={imageUris}
                alt="Card"
                className="w-full h-auto rounded-lg"
            />
        </div>
    );
};

export default Card;
