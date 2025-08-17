import React from "react";

interface Props {
    startNewGame: () => void;
}

function NewGameButton({ startNewGame }: Props) {
    return <button onClick={startNewGame}>New Game</button>;
}

export default NewGameButton;
