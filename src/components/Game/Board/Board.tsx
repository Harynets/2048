import React, { useEffect, useRef, useState } from "react";
import Square from "./Square";
import "./Board.css";

interface SquareInterface {
    id: number;
    value: number;
}

function initializeRandomSquare(arr: SquareInterface[][]) {
    // clone arr
    arr = arr.map((row) => row.map((cell) => ({ ...cell })));

    let [randomIndexI, randomIndexJ] = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
    while (arr[randomIndexI][randomIndexJ].value) {
        [randomIndexI, randomIndexJ] = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
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

    // handle keyboard event
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            // create a 4x4 matrix filled with SquareInterface objects
            let arr = new Array();
            for (let i = 0; i < 4; i++) {
                arr.push(new Array());
                for (let j = 0; j < 4; j++) {
                    arr[i].push({
                        id: i * 4 + j,
                        value: 0,
                    } as SquareInterface);
                }
            }

            let freeIndex, prevValue: number;

            if (event.key == "ArrowLeft") {
                setSquares((prevSquares) => {
                    for (let i = 0; i < 4; i++) {
                        freeIndex = 0;
                        prevValue = 0;
                        for (let j = 0; j < 4; j++) {
                            if (prevValue && prevSquares[i][j].value == prevValue) {
                                arr[i][freeIndex - 1].value = prevValue * 2;
                                prevValue = 0;
                            } else if (prevSquares[i][j].value) {
                                arr[i][freeIndex].value = prevSquares[i][j].value;
                                prevValue = prevSquares[i][j].value;
                                freeIndex++;
                            }
                        }
                    }
                    return initializeRandomSquare(arr);
                });
            } else if (event.key == "ArrowRight") {
                setSquares((prevSquares) => {
                    for (let i = 3; i >= 0; i--) {
                        freeIndex = 3;
                        prevValue = 0;
                        for (let j = 3; j >= 0; j--) {
                            if (prevValue && prevSquares[i][j].value == prevValue) {
                                arr[i][freeIndex + 1].value = prevValue * 2;
                                prevValue = 0;
                            } else if (prevSquares[i][j].value) {
                                arr[i][freeIndex].value = prevSquares[i][j].value;
                                prevValue = prevSquares[i][j].value;
                                freeIndex--;
                            }
                        }
                    }

                    return initializeRandomSquare(arr);
                });
            } else if (event.key == "ArrowUp") {
                setSquares((prevSquares) => {
                    for (let i = 0; i < 4; i++) {
                        freeIndex = 0;
                        prevValue = 0;
                        for (let j = 0; j < 4; j++) {
                            if (prevValue && prevSquares[j][i].value == prevValue) {
                                arr[freeIndex - 1][i].value = prevValue * 2;
                                prevValue = 0;
                            } else if (prevSquares[j][i].value) {
                                arr[freeIndex][i].value = prevSquares[j][i].value;
                                prevValue = prevSquares[j][i].value;
                                freeIndex++;
                            }
                        }
                    }

                    return initializeRandomSquare(arr);
                });
            } else if (event.key == "ArrowDown") {
                setSquares((prevSquares) => {
                    for (let i = 3; i >= 0; i--) {
                        freeIndex = 3;
                        prevValue = 0;
                        for (let j = 3; j >= 0; j--) {
                            if (prevValue && prevSquares[j][i].value == prevValue) {
                                arr[freeIndex + 1][i].value = prevValue * 2;
                                prevValue = 0;
                            } else if (prevSquares[j][i].value) {
                                arr[freeIndex][i].value = prevSquares[j][i].value;
                                prevValue = prevSquares[j][i].value;
                                freeIndex--;
                            }
                        }
                    }

                    return initializeRandomSquare(arr);
                });
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        // cleanup
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            <div className="border-stone-300 border-5 rounded-lg">
                {squares.map((squareArr, index) => {
                    return (
                        <div className="row" key={index}>
                            {squareArr.map((square: SquareInterface) => {
                                return <Square squareValue={square.value} key={square.id} />;
                            })}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Board;
