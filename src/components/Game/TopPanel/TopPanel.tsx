import React from "react";
import Score from "./Score";

interface Props {
    score: number;
}

function TopPanel({ score }: Props) {
    return (
        <>
            <div className="score flex justify-end">
                <Score title="Score" score={score} />
                <Score title="Best score" score={Number(localStorage.getItem("bestScore")) || 0} />
            </div>
        </>
    );
}

export default TopPanel;
