import React from "react";

interface Props {
    title: string;
    score: number;
}

function Score({ title, score }: Props) {
    return (
        <>
            <div className="bg-amber-50 border-stone-300 border-2 rounded-lg shadow-sm w-1/2 mb-3 ms-3 p-0.5">
                <h2 className="font-bold text-xl">{title}</h2>
                <h2 className="font-bold text-xl">{score}</h2>
            </div>
        </>
    );
}

export default Score;
