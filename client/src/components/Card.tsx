import React from 'react';

interface CardProps {
    imageUris: string;
}

const Card: React.FC<CardProps> = ({ imageUris }) => {
  return (
    <div className="flex flex-col items-center p-2 ">
      <img src={imageUris} alt="Card" className="w-full h-auto" />
      {/* More card details here */}
    </div>
  );
}

export default Card;
