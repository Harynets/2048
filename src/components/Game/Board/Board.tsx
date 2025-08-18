import React from "react";
import Square from "./Square";
import "./Board.css";
import type { SquareInterface } from "../Game";

interface Props {
    squares: SquareInterface[][];
    isUserLost: (arr: SquareInterface[][]) => boolean;
    isUserWon: (arr: SquareInterface[][]) => boolean;
}

function Board({ squares, isUserLost, isUserWon }: Props) {
    return (
        <>
            <div className="container relative">
                <div className="border-stone-300 border-5 rounded-lg shadow-sm">
                    {squares.map((squareArr, index) => {
                        return (
                            <div className="row" key={index}>
                                {squareArr.map((square: SquareInterface) => {
                                    return (
                                        <Square
                                            squareValue={square.value}
                                            moveToI={square.moveToI}
                                            moveToJ={square.moveToJ}
                                            isNew={square.isNew}
                                            isMerged={square.isMerged}
                                            key={square.id}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
                <div className={`end-game rounded-lg ${isUserLost(squares) || isUserWon(squares) ? "" : "-z-1"}`}>
                    <h1>
                        {isUserLost(squares) && !isUserWon(squares) ? "Game over!" : ""}
                        {isUserWon(squares) ? "You have won!" : ""}
                    </h1>
                </div>
            </div>
        </>
    );
}

export default Board;
