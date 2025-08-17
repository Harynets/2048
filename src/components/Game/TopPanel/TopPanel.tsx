import React from "react";
import Score from "./Score";
import NewGameButton from "./NewGameButton";

interface Props {
    score: number;
    startNewGame: () => void;
}

function TopPanel({ score, startNewGame }: Props) {
    return (
        <>
            <NewGameButton startNewGame={startNewGame} />
            <div className="score flex justify-end">
                <Score title="Score" score={score} />
                <Score title="Best score" score={Number(localStorage.getItem("bestScore")) || 0} />
            </div>
        </>
    );
}

export default TopPanel;
