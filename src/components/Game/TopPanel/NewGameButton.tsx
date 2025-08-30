import React from "react";

interface Props {
    startNewGame: () => void;
}

function NewGameButton({ startNewGame }: Props) {
    return (
        <button
            onClick={startNewGame}
            className="cursor-pointer bg-[#fae48b] border border-stone-300 rounded-lg p-2 mb-3 ms-3 w-full hover:bg-[#f9db65] active:scale-95 focus:outline-none font-bold text-lg shadow-sm"
        >
            New Game
        </button>
    );
}

export default NewGameButton;
