import React from "react";
import Score from "./Score";

interface Props {
    score: number;
}

function TopPanel({ score }: Props) {
    return <Score score={score} />;
}

export default TopPanel;
