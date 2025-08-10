import React from "react";
import "./Square.css";

interface Props {
    squareValue: number;
}

function Square({ squareValue }: Props) {
    const squareColor: { [key: number]: string } = {
        2: "bg-yellow-200",
        4: "bg-yellow-300",
        8: "bg-yellow-500",
        16: "bg-lime-400",
        32: "bg-lime-600 text-white",
        64: "bg-green-700 text-white",
        128: "bg-teal-500 text-white",
        256: "bg-cyan-500 text-white",
        512: "bg-sky-600 text-white",
        1024: "bg-blue-700 text-white",
        2048: "bg-indigo-800 text-white",
    };

    return (
        <div className={`h-[125px] w-[125px] bg-stone-300 border-stone-300 border-5`}>
            <div
                className={`${
                    squareColor[squareValue] ?? "bg-amber-50"
                } rounded-lg h-full w-full flex justify-center items-center`}
            >
                <h1 className="font-semibold">{squareValue ? squareValue.toString() : ""}</h1>
            </div>
        </div>
    );
}

export default Square;
