import React, { useEffect, useRef } from "react";
import Score from "./Score";
import NewGameButton from "./NewGameButton";

interface Props {
    score: number;
    addScore: number;
    startNewGame: () => void;
}

function TopPanel({ score, addScore, startNewGame }: Props) {
    const addScoreDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (addScoreDivRef.current) {
            addScoreDivRef.current.innerHTML = addScore ? `+${addScore}` : "";
            addScoreDivRef.current.animate(
                [
                    { transform: "translateY(0px)", color: "#2b2b1f" },
                    { transform: "translateY(-130px)", color: "#2b2b1f00" },
                ],

                {
                    duration: 900,
                    easing: "ease-in-out",
                    fill: "forwards",
                }
            );
        }
    }, [score]);

    return (
        <div className="flex">
            <div className="flex items-end w-1/2 mb-3">
                <p className="text-7xl font-medium">2048</p>
            </div>
            <div className="flex flex-col w-1/2">
                <div className="flex justify-end">
                    <NewGameButton startNewGame={startNewGame} />
                </div>
                <div className="flex justify-end">
                    <Score title="Score" score={score}>
                        <div className="relative select-none">
                            <div
                                ref={addScoreDivRef}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pb-7"
                            ></div>
                        </div>
                    </Score>
                    <Score title="Best score" score={Number(localStorage.getItem("bestScore")) || 0} />
                </div>
            </div>
        </div>
    );
}

// render only if score changed
export default React.memo(TopPanel, (prev, next) => {
    return next.addScore === 0 && prev.score === next.score;
});
