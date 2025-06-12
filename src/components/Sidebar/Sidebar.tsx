import React from 'react';
import './Sidebar.scss';

type SidebarProps = {
    score: number;
    pairsLeft: number;
};

const Sidebar: React.FC<SidebarProps> = ({ score, pairsLeft }) => {
    return (
        <div className="sidebar">
            <h3>Score: {score}</h3>
            <h4>Pairs left: {pairsLeft}</h4>
        </div>
    );
};

export default Sidebar;