import React, { useState } from "react";
import Square from "./Square";
import "./Board.css";

interface SquareInterface {
    id: number;
    value: Number;
}

function Board() {
    // create a 4x4 matrix filled with SquareInterface objects
    const [squares, setSquares] = useState(() => {
        let arr: SquareInterface[][] = [];
        for (let i = 0; i < 4; i++) {
            arr.push(new Array());
            for (let j = 0; j < 4; j++) {
                arr[i].push({ id: i * 4 + j, value: 0 } as SquareInterface);
            }
        }
        return arr;
    });

    return (
        <>
            {squares.map((squareArr, index) => {
                return (
                    <div className="row" key={index}>
                        {squareArr.map((square: SquareInterface) => {
                            return (
                                <Square
                                    squareValue={square.value}
                                    key={square.id}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </>
    );
}

export default Board;
