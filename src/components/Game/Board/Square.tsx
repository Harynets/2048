import React from "react";
import "./Square.css";

interface Props {
    squareValue: Number;
}

function Square({ squareValue }: Props) {
    return <div className="square">{squareValue.toString()}</div>;
}

export default Square;
