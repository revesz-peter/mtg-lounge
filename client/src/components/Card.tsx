import React from 'react';

interface CardProps {
    imageUris: string;
}

const Card: React.FC<CardProps> = ({ imageUris }) => {
  return (
    <div className="card">
      <img src={imageUris} alt="Card" className="h-96" />
    </div>
  );
};

export default Card;
