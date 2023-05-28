import { useDrag } from "react-dnd";

interface DeckCardProps {
    id: string;
    imageUris: string;
    name: string;
    
}

const DeckCard: React.FC<DeckCardProps> = ({ id, imageUris, name }) => {
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
            <div className="bg-gray-200 rounded flex w-full">
                <p className="text-gray-700 m-auto">{name}</p>
            </div>
        </div>
    );
};

export default DeckCard;
