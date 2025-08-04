import React, { useState } from "react";
import Square from "./Square";
import "./Board.css";

interface SquareInterface {
    id: number;
    value: Number;
}

function initializeRandomSquare(arr: SquareInterface[][]) {
    arr = arr.map((row) => row.map((cell) => ({ ...cell })));

    let [randomIndexI, randomIndexJ] = [
        Math.floor(Math.random() * 4),
        Math.floor(Math.random() * 4),
    ];
    while (arr[randomIndexI][randomIndexJ].value) {
        [randomIndexI, randomIndexJ] = [
            Math.floor(Math.random() * 4),
            Math.floor(Math.random() * 4),
        ];
    }

    arr[randomIndexI][randomIndexJ].value = 2;
    return arr;
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

        // initialize two random squares with value of '2'
        arr = initializeRandomSquare(arr);
        arr = initializeRandomSquare(arr);
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
