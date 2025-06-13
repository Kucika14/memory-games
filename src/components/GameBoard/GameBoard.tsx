import React from 'react';
import './GameBoard.scss';
import Card from '../Card/Card';
import { UseMemoryGame } from '../../GameLogic/useMemoryGame';

type GameBoardProps = Pick<UseMemoryGame, 'cards' | 'handleCardClick'>;

const GameBoard: React.FC<GameBoardProps> = ({ cards, handleCardClick }) => {

    const onCardClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        const cardId = e.currentTarget.getAttribute('data-card');
        handleCardClick(cardId || '');
    };

    return (
        <div className="game-board">
            <div className="card-grid">
                {cards.map((card, idx) => (
                    <Card
                        imageId={card.imageId}
                        uniqueId={card.uniqueId}
                        flipped={card.flipped}
                        onClick={onCardClick}
                        key={idx}
                    />
                ))}
            </div>
        </div>
    );
};

export default GameBoard;