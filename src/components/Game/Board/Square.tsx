import React, { useEffect, useRef } from "react";
import "./Square.css";

interface Props {
    squareValue: number;
    moveToI: number;
    moveToJ: number;
    isNew: boolean;
    isMerged: boolean;
}

function Square({ squareValue, moveToI, moveToJ, isNew, isMerged }: Props) {
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

    // add class for merge animation
    const squareRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!isMerged || !squareRef.current) return;

        // if the square already has the "merge" class, remove it and add it back to restart the animation
        squareRef.current.classList.remove("merge");
        void squareRef.current.offsetWidth; // force reflow
        squareRef.current.classList.add("merge");
    }, [squareValue]);

    return (
        <div className={`h-[125px] w-[125px] bg-stone-300 border-stone-300 border-5`}>
            <div className="bg-amber-50 rounded-lg h-full w-full">
                <div
                    ref={squareRef}
                    className={`h-full w-full ${
                        moveToJ || moveToI ? "transition-transform duration-100 ease-in-out relative z-2" : ""
                    }`}
                    style={{
                        transform: `translate(${moveToJ * 125}px, ${moveToI * 125}px)`,
                    }}
                >
                    <div
                        className={`${isNew && "initialize-square"} ${
                            squareColor[squareValue] ?? "bg-amber-50"
                        } h-full w-full flex justify-center items-center rounded-lg`}
                    >
                        <h1 className="font-semibold">{squareValue ? squareValue.toString() : ""}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Square, (prev, next) => {
    return (
        prev.isMerged === next.isMerged &&
        prev.isNew === next.isNew &&
        prev.moveToI === next.moveToI &&
        prev.moveToJ === next.moveToJ &&
        prev.squareValue === next.squareValue
    );
});
