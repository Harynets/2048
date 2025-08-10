import React, { useEffect, useRef, useState } from "react";
import Square from "./Square";
import "./Board.css";

interface SquareInterface {
    id: number;
    value: number;
}

interface Props {
    setScore: React.Dispatch<React.SetStateAction<number>>;
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

function isUserLost(arr: SquareInterface[][]): boolean {
    // check if there are empty squares
    if (arr.some((row: SquareInterface[]) => row.some((elem) => elem.value === 0))) {
        return false;
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (arr[i][j].value === arr[i + 1]?.[j]?.value || arr[i][j].value === arr[i]?.[j + 1]?.value) {
                return false;
            }
        }
    }
    return true;
}

function Board({ setScore }: Props) {
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

    const addScoreRef = useRef(0);
    const squaresRef = useRef(squares);

    // update squares arr every time it changes
    useEffect(() => {
        squaresRef.current = squares;
    }, [squares]);

    // handle keyboard event
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;

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
                for (let i = 0; i < 4; i++) {
                    freeIndex = 0;
                    prevValue = 0;
                    for (let j = 0; j < 4; j++) {
                        if (prevValue && squaresRef.current[i][j].value == prevValue) {
                            arr[i][freeIndex - 1].value = prevValue * 2;
                            addScoreRef.current += prevValue * 2;
                            prevValue = 0;
                        } else if (squaresRef.current[i][j].value) {
                            arr[i][freeIndex].value = squaresRef.current[i][j].value;
                            prevValue = squaresRef.current[i][j].value;
                            freeIndex++;
                        }
                    }
                }
            } else if (event.key == "ArrowRight") {
                for (let i = 3; i >= 0; i--) {
                    freeIndex = 3;
                    prevValue = 0;
                    for (let j = 3; j >= 0; j--) {
                        if (prevValue && squaresRef.current[i][j].value == prevValue) {
                            arr[i][freeIndex + 1].value = prevValue * 2;
                            addScoreRef.current += prevValue * 2;
                            prevValue = 0;
                        } else if (squaresRef.current[i][j].value) {
                            arr[i][freeIndex].value = squaresRef.current[i][j].value;
                            prevValue = squaresRef.current[i][j].value;
                            freeIndex--;
                        }
                    }
                }
            } else if (event.key == "ArrowUp") {
                for (let i = 0; i < 4; i++) {
                    freeIndex = 0;
                    prevValue = 0;
                    for (let j = 0; j < 4; j++) {
                        if (prevValue && squaresRef.current[j][i].value == prevValue) {
                            arr[freeIndex - 1][i].value = prevValue * 2;
                            addScoreRef.current += prevValue * 2;
                            prevValue = 0;
                        } else if (squaresRef.current[j][i].value) {
                            arr[freeIndex][i].value = squaresRef.current[j][i].value;
                            prevValue = squaresRef.current[j][i].value;
                            freeIndex++;
                        }
                    }
                }
            } else if (event.key == "ArrowDown") {
                for (let i = 3; i >= 0; i--) {
                    freeIndex = 3;
                    prevValue = 0;
                    for (let j = 3; j >= 0; j--) {
                        if (prevValue && squaresRef.current[j][i].value == prevValue) {
                            arr[freeIndex + 1][i].value = prevValue * 2;
                            addScoreRef.current += prevValue * 2;
                            prevValue = 0;
                        } else if (squaresRef.current[j][i].value) {
                            arr[freeIndex][i].value = squaresRef.current[j][i].value;
                            prevValue = squaresRef.current[j][i].value;
                            freeIndex--;
                        }
                    }
                }
            }

            if (arr.some((row: SquareInterface[]) => row.some((elem) => elem.value === 0))) {
                setSquares(initializeRandomSquare(arr));
            }
            setScore(addScoreRef.current);
        }

        window.addEventListener("keydown", handleKeyDown);

        // cleanup
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            <div className="container">
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
                <div className={`end-game rounded-lg ${isUserLost(squares) ? "" : "-z-1"}`}>
                    <h1>Game over!</h1>
                </div>
            </div>
        </>
    );
}

export default Board;
