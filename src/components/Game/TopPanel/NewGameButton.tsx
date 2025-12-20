interface Props {
    startNewGame: () => void;
}

function NewGameButton({ startNewGame }: Props) {
    return (
        <button
            type="button"
            onClick={startNewGame}
            className="bg-[#fae48b] border border-stone-300 lg:hover:bg-[#f9db65] active:scale-99 lg:active:brightness-97 focus:outline-none cursor-pointer font-bold text-lg shadow-sm rounded-lg p-2 mb-3 ms-3 w-full"
        >
            New Game
        </button>
    );
}

export default NewGameButton;
