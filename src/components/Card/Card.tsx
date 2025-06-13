import React, { useState } from 'react';
import './Card.scss';
import { CardType } from '../../GameLogic/useMemoryGame';




type CardProps = Pick<CardType, 'imageId' | 'uniqueId' | 'flipped'> & {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Card: React.FC<CardProps> = ({ onClick, flipped, imageId, uniqueId, }) => {
    return (
        <button
            className="card"
            data-card={uniqueId}
            onClick={onClick}>
            {flipped ? <img src={`/assets/pokemon_0${imageId}.jpg`} alt="pokemon" /> : '?'}
        </button>
    );
};

export default Card;