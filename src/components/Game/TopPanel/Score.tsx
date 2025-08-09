import React from "react";

interface Props {
    score: number;
}

function Score({ score }: Props) {
    return <h1>{score}</h1>;
}

export default Score;
