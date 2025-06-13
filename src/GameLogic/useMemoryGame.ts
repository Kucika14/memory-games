import { useState } from 'react';

export interface CardType {
    uniqueId: string;      // minden kártya egyedi azonosítója (pl. uuid)
    imageId: number;       // 1-től 4-ig, a kép azonosítója
    flipped: boolean;
    matched: boolean;
};

const IMAGE_IDS = [1, 2, 3, 4, 5, 6];

function generateUniqueId() {
    return Math.random().toString(36).substring(2, 12) + Date.now();
}

function shuffleCards(): CardType[] {
    const cards = IMAGE_IDS
        .flatMap((imageId) => [
            { uniqueId: generateUniqueId(), imageId, flipped: false, matched: false },
            { uniqueId: generateUniqueId(), imageId, flipped: false, matched: false },
        ]);
    return cards.sort(() => Math.random() - 0.5);
}

export interface UseMemoryGame {
    cards: CardType[];
    handleCardClick: (uniqueId: string) => void;
    resetGame: () => void;
    score: number;
    pairsLeft: number;
    isWin: boolean;
}

export function useMemoryGame(): UseMemoryGame {
    const [cards, setCards] = useState<CardType[]>(shuffleCards());
    const [flipped, setFlipped] = useState<string[]>([]);
    const [score, setScore] = useState(0);

    function handleCardClick(uniqueId: string) {
        const idx = cards.findIndex(card => card.uniqueId === uniqueId);
        if (cards[idx].flipped || cards[idx].matched || flipped.length === 2) return;

        const newCards = cards.map((card, i) =>
            i === idx ? { ...card, flipped: true } : card
        );
        const newFlipped = [...flipped, uniqueId];
        setCards(newCards);
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            const [firstId, secondId] = newFlipped;
            const firstIdx = newCards.findIndex(card => card.uniqueId === firstId);
            const secondIdx = newCards.findIndex(card => card.uniqueId === secondId);

            if (newCards[firstIdx].imageId === newCards[secondIdx].imageId) {
                setTimeout(() => {
                    setCards((cards) =>
                        cards.map((card) =>
                            card.uniqueId === firstId || card.uniqueId === secondId
                                ? { ...card, matched: true }
                                : card
                        )
                    );
                    setScore((s) => s + 1);
                    setFlipped([]);
                }, 1000);
            } else {
                setTimeout(() => {
                    setCards((cards) =>
                        cards.map((card) =>
                            card.uniqueId === firstId || card.uniqueId === secondId
                                ? { ...card, flipped: false }
                                : card
                        )
                    );
                    setFlipped([]);
                }, 1000);
            }
        }
    }

    function resetGame() {
        setCards(shuffleCards());
        setFlipped([]);
        setScore(0);
    }

    const pairsLeft = IMAGE_IDS.length - score;
    const isWin = pairsLeft === 0;

    return {
        cards,
        handleCardClick,
        resetGame,
        score,
        pairsLeft,
        isWin,
    };
}