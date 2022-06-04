import React from "react";
import Score from "./Score";

export default function ScoreBoard({ player, opponent }) {
    return (
        <div className="score-board">
            <Score points={player[1]} reverse={false} />
            <Score points={opponent[1]} reverse={true} />
        </div>
    );
}
