import React, { useState } from 'react';

const colors = ['W', 'U', 'B', 'R', 'G']; // Color symbols

const colorImages: Record<string, string> = {
    W: '/colors/W.png',
    U: '/colors/U.png',
    B: '/colors/B.png',
    R: '/colors/R.png',
    G: '/colors/G.png',
}; // Map color symbols to image paths

const ColorFilter: React.FC = () => {
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const handleColorClick = (color: string) => {
        setSelectedColor(prevColor => prevColor === color ? null : color);
    };

    return (
        <div className="flex">
            {colors.map((color) => (
                <img
                    key={color}
                    src={colorImages[color]}
                    alt={color}
                    className={`cursor-pointer m-2 sm:w-12 sm:h-12 w-8 h-8 ${selectedColor === color ? 'opacity-100' : 'opacity-50'}`}
                    onClick={() => handleColorClick(color)}
                />
            ))}
        </div>
    );
};

export default ColorFilter;
