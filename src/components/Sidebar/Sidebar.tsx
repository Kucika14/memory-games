import React from 'react';
import './Sidebar.scss';

type SidebarProps = {
    score: number;
    pairsLeft: number;
    started: boolean;
    isWin: boolean;
    resetGame: () => void;
    children: React.ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ score, pairsLeft, resetGame, children }) => (
    <div className="sidebar">
        <h3>Score: {score}</h3>
        <h4>Pairs left: {pairsLeft}</h4>
        {children}
        <button className="reset-btn" onClick={resetGame}>Restart</button>
    </div>
);

export default Sidebar;