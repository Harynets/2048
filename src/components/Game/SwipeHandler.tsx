import React, { useRef } from "react";

interface Props {
    children: React.ReactNode;
    handleMove: (direction: string) => void;
}

function SwipeHandler({ children, handleMove }: Props) {
    let startTouchPoint = useRef({ screenX: 0, screenY: 0 });

    function handleSwipe(event: React.TouchEvent<HTMLDivElement>) {
        let startX = startTouchPoint.current.screenX;
        let startY = startTouchPoint.current.screenY;
        let endX = event.changedTouches[0].screenX;
        let endY = event.changedTouches[0].screenY;

        if (Math.abs(startX - endX) > Math.abs(startY - endY)) {
            if (startX < endX) {
                handleMove("ArrowRight");
            } else if (startX > endX) {
                handleMove("ArrowLeft");
            }
        } else {
            if (startY < endY) {
                handleMove("ArrowDown");
            } else if (startY > endY) {
                handleMove("ArrowUp");
            }
        }
        document.documentElement.style.overscrollBehavior = "auto"; // return pull-to-refresh/overscroll to default
    }

    return (
        <div
            onTouchStart={(event) => {
                document.documentElement.style.overscrollBehavior = "none"; // prevent page refresh by swiping down
                startTouchPoint.current = { screenX: event.touches[0].screenX, screenY: event.touches[0].screenY };
            }}
            onTouchEnd={handleSwipe}
        >
            {children}
        </div>
    );
}

export default SwipeHandler;
