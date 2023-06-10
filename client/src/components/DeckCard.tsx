import { useDrag } from "react-dnd";
import { useState } from "react";

interface DeckCardProps {
    id: string;
    imageUris: string;
    name: string;
    count: number;
}

const DeckCard: React.FC<DeckCardProps> = ({ id, imageUris, name, count }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "deckCard",
        item: { id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const [showCard, setShowCard] = useState(false);
    const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 });

    const handleMouseEnter = (e: React.MouseEvent) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        let top = rect.top;
        const left = rect.left - 350;
        const windowHeight = window.innerHeight;
        const cardHeight = 350; //same as the height you set in the style
        const safetyMargin = 130; //subtracting safety margin to accommodate for unknown factors
    
        //If the bottom edge of the card would be lower than the window height,
        //move the card up so that it fits into the window.
        if (rect.top + cardHeight > windowHeight) {
            top = windowHeight - cardHeight - safetyMargin;
        }
    
        setCardPosition({ top: top, left: left });
        setShowCard(true);
    };

    const handleMouseLeave = () => {
        setShowCard(false);
    };

    const handleMouseDown = () => {
        setShowCard(false);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        let top = rect.top;
        const left = rect.left - 350;
        const windowHeight = window.innerHeight;
        const cardHeight = 350;
        const safetyMargin = 130;
    
        if (rect.top + cardHeight > windowHeight) {
            top = windowHeight - cardHeight - safetyMargin;
        }
    
        setCardPosition({ top: top, left: left });
        setShowCard(true);
    };

    const handleTouchEnd = () => {
        setShowCard(false);
    };

    return (
        <div
            ref={drag}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className="relative flex flex-col items-center p-0.5"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="bg-gray-200 rounded flex w-full">
                <div className="flex justify-between items-center w-full">
                    <p className="text-gray-700 m-2 font-black flex-grow truncate">
                        {name}
                    </p>
                    <span className="text-gray-700 m-2 mr-8 flex-shrink-0">
                        {count > 1 ? count : ""}
                    </span>
                </div>
            </div>
            {showCard && (
                <div 
                style={{
                    position: "fixed", 
                    top: cardPosition.top, 
                    left: cardPosition.left, 
                    zIndex: 1,
                    width: '350px',
                    height: '350px'
                }}
                >
                    <img src={imageUris} alt={name} className="rounded-lg"/>
                </div>
            )}
        </div>
    );
};

export default DeckCard;
