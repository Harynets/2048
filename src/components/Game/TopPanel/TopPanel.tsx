import React from "react";
import Score from "./Score";
import NewGameButton from "./NewGameButton";

interface Props {
    score: number;
    startNewGame: () => void;
}

function TopPanel({ score, startNewGame }: Props) {
    return (
        <div className="flex">
            <div className="flex items-end w-1/2 mb-3">
                <p className="text-7xl font-medium">2048</p>
            </div>
            <div className="flex flex-col w-1/2">
                <div className="flex justify-end">
                    <NewGameButton startNewGame={startNewGame} />
                </div>
                <div className="flex justify-end">
                    <Score title="Score" score={score} />
                    <Score title="Best score" score={Number(localStorage.getItem("bestScore")) || 0} />
                </div>
            </div>
        </div>
    );
}

export default TopPanel;
