import React, { useState } from "react";
import Board from "./Board/Board";
import TopPanel from "./TopPanel/TopPanel";

function Game() {
    const [score, setScore] = useState(0);

    return (
        <>
            <TopPanel score={score} />
            <Board setScore={setScore} />
        </>
    );
}

export default Game;
