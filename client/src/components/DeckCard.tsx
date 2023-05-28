import { useDrag } from "react-dnd";

interface DeckCardProps {
    id: string;
    imageUris: string;
}

const DeckCard: React.FC<DeckCardProps> = ({ id, imageUris }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "deckCard",
        item: { id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className="flex flex-col items-center p-2"
        >
            <img src={imageUris} alt="Card" className="w-full h-auto" />
        </div>
    );
};

export default DeckCard;
