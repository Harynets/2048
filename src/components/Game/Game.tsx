import React, { useEffect, useRef, useState } from "react";
import Board from "./Board/Board";
import TopPanel from "./TopPanel/TopPanel";
import SwipeHandler from "./SwipeHandler";

export interface SquareInterface {
    id: number;
    value: number;
    moveToI: number;
    moveToJ: number;
    isNew: boolean;
    isMerged: boolean;
}

function initializeRandomSquare(arr: SquareInterface[][]) {
    // clone arr
    arr = arr.map((row) => row.map((cell) => ({ ...cell })));

    let [randomIndexI, randomIndexJ] = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
    while (arr[randomIndexI][randomIndexJ].value) {
        [randomIndexI, randomIndexJ] = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
    }

    arr[randomIndexI][randomIndexJ].value = 2;
    arr[randomIndexI][randomIndexJ].isNew = true;
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

function isUserWon(arr: SquareInterface[][]): boolean {
    return arr.some((row: SquareInterface[]) => row.some((elem) => elem.value === 2048));
}

function createSquareInterfaceObjMatrix() {
    let arr: SquareInterface[][] = [];
    for (let i = 0; i < 4; i++) {
        arr.push(new Array());
        for (let j = 0; j < 4; j++) {
            arr[i].push({
                id: i * 4 + j,
                value: 0,
                moveToI: 0,
                moveToJ: 0,
                isNew: false,
                isMerged: false,
            } as SquareInterface);
        }
    }
    return arr;
}

function Game() {
    const [score, setScore] = useState(0);

    // create a 4x4 matrix filled with SquareInterface objects
    const [squares, setSquares] = useState(() => {
        let arr: SquareInterface[][] = createSquareInterfaceObjMatrix();

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
        window.addEventListener("keydown", handleKeyDown);

        // cleanup
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    function handleKeyDown(event: KeyboardEvent) {
        if (
            !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key) ||
            isUserLost(squaresRef.current) ||
            isUserWon(squaresRef.current)
        )
            return;

        handleMove(event.key);
    }

    function handleMove(direction: string) {
        let arr = createSquareInterfaceObjMatrix(); // result array after move
        const coordsArr = squaresRef.current.map((row) => row.map((cell) => ({ ...cell }))); // copy for animation offsets

        if (direction == "ArrowLeft") {
            moveLeft(arr, coordsArr);
        } else if (direction == "ArrowRight") {
            moveRight(arr, coordsArr);
        } else if (direction == "ArrowUp") {
            moveUp(arr, coordsArr);
        } else if (direction == "ArrowDown") {
            moveDown(arr, coordsArr);
        }
    }

    function moveLeft(arr: SquareInterface[][], coordsArr: SquareInterface[][]) {
        let freeIndex, prevValue: number;
        // calculate offsets for the move animation and move all squares to the left
        for (let i = 0; i < 4; i++) {
            freeIndex = 0;
            prevValue = 0;
            for (let j = 0; j < 4; j++) {
                if (prevValue && squaresRef.current[i][j].value === prevValue) {
                    arr[i][freeIndex - 1].value = prevValue * 2;
                    addScoreRef.current += prevValue * 2;
                    coordsArr[i][j].moveToJ = freeIndex - j - 1;
                    prevValue = 0;
                    arr[i][freeIndex - 1].isMerged = true;
                } else if (squaresRef.current[i][j].value) {
                    arr[i][freeIndex].value = squaresRef.current[i][j].value;
                    coordsArr[i][j].moveToJ = freeIndex - j;
                    prevValue = squaresRef.current[i][j].value;
                    freeIndex++;
                }
            }
        }

        updateAfterMove(arr, coordsArr);
    }

    function moveRight(arr: SquareInterface[][], coordsArr: SquareInterface[][]) {
        let freeIndex, prevValue: number;
        // calculate offsets for the move animation and move all squares to the right
        for (let i = 3; i >= 0; i--) {
            freeIndex = 3;
            prevValue = 0;
            for (let j = 3; j >= 0; j--) {
                if (prevValue && squaresRef.current[i][j].value == prevValue) {
                    arr[i][freeIndex + 1].value = prevValue * 2;
                    coordsArr[i][j].moveToJ = freeIndex - j + 1;
                    addScoreRef.current += prevValue * 2;
                    prevValue = 0;
                    arr[i][freeIndex + 1].isMerged = true;
                } else if (squaresRef.current[i][j].value) {
                    arr[i][freeIndex].value = squaresRef.current[i][j].value;
                    coordsArr[i][j].moveToJ = freeIndex - j;
                    prevValue = squaresRef.current[i][j].value;
                    freeIndex--;
                }
            }
        }

        updateAfterMove(arr, coordsArr);
    }

    function moveUp(arr: SquareInterface[][], coordsArr: SquareInterface[][]) {
        let freeIndex, prevValue: number;
        // calculate offsets for the move animation and move all squares up
        for (let i = 0; i < 4; i++) {
            freeIndex = 0;
            prevValue = 0;
            for (let j = 0; j < 4; j++) {
                if (prevValue && squaresRef.current[j][i].value == prevValue) {
                    arr[freeIndex - 1][i].value = prevValue * 2;
                    coordsArr[j][i].moveToI = freeIndex - j - 1;
                    addScoreRef.current += prevValue * 2;
                    prevValue = 0;
                    arr[freeIndex - 1][i].isMerged = true;
                } else if (squaresRef.current[j][i].value) {
                    arr[freeIndex][i].value = squaresRef.current[j][i].value;
                    coordsArr[j][i].moveToI = freeIndex - j;
                    prevValue = squaresRef.current[j][i].value;
                    freeIndex++;
                }
            }
        }

        updateAfterMove(arr, coordsArr);
    }

    function moveDown(arr: SquareInterface[][], coordsArr: SquareInterface[][]) {
        let freeIndex, prevValue: number;
        // calculate offsets for the move animation and move all squares down
        for (let i = 3; i >= 0; i--) {
            freeIndex = 3;
            prevValue = 0;
            for (let j = 3; j >= 0; j--) {
                if (prevValue && squaresRef.current[j][i].value == prevValue) {
                    arr[freeIndex + 1][i].value = prevValue * 2;
                    coordsArr[j][i].moveToI = freeIndex - j + 1;
                    addScoreRef.current += prevValue * 2;
                    prevValue = 0;
                    arr[freeIndex + 1][i].isMerged = true;
                } else if (squaresRef.current[j][i].value) {
                    arr[freeIndex][i].value = squaresRef.current[j][i].value;
                    coordsArr[j][i].moveToI = freeIndex - j;
                    prevValue = squaresRef.current[j][i].value;
                    freeIndex--;
                }
            }
        }

        updateAfterMove(arr, coordsArr);
    }
    function updateAfterMove(arr: SquareInterface[][], coordsArr: SquareInterface[][]) {
        // start animation
        setSquares(coordsArr);
        // wait for the end of animation and update squares array, merge squares
        setTimeout(() => {
            // add a new square if there is at least one empty cell and move changed array
            if (
                arr.some((row: SquareInterface[]) => row.some((elem) => elem.value === 0)) &&
                !arr.flat().every((elem, index) => elem.value === squaresRef.current.flat()[index].value)
            ) {
                arr = initializeRandomSquare(arr);
                setSquares(arr);
            }

            setScore(addScoreRef.current);
            // update best score
            if ((isUserLost(arr) || isUserWon(arr)) && addScoreRef.current > Number(localStorage.getItem("bestScore"))) {
                localStorage.setItem("bestScore", addScoreRef.current.toString());
            }
        }, 100);
    }

    function startNewGame() {
        let arr = createSquareInterfaceObjMatrix();
        addScoreRef.current = 0;
        setScore(addScoreRef.current);

        // initialize two random squares with value of '2'
        arr = initializeRandomSquare(arr);
        arr = initializeRandomSquare(arr);
        setSquares(arr);
    }

    return (
        <>
            <SwipeHandler handleMove={handleMove}>
                <TopPanel score={score} startNewGame={startNewGame} />
                <Board squares={squares} isUserLost={isUserLost} isUserWon={isUserWon} />
            </SwipeHandler>
        </>
    );
}

export default Game;
