import { useDrag } from "react-dnd";

interface CardProps {
    id: string;
    imageUris: string;
    name: string;
}

const Card: React.FC<CardProps> = ({ id, imageUris, name }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "card",
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

export default Card;
