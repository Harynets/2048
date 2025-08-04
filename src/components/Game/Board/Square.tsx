import React from "react";
import "./Square.css";

interface Props {
    squareValue: Number;
}

function Square({ squareValue }: Props) {
    return (
        <div className="square flex justify-center items-center bg-amber-50 border-stone-300 border-5">
            <h1 className="font-semibold">{squareValue.toString()}</h1>
        </div>
    );
}

export default Square;
