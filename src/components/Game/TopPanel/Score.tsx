import React from "react";

interface Props {
    title: string;
    score: number;
}

function Score({ title, score }: Props) {
    return (
        <>
            <h1>{title}</h1>
            <h1>{score}</h1>
        </>
    );
}

export default Score;
