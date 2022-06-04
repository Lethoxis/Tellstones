import React from "react";
import Score from "./Score";

export default function ScoreBoard({ player, opponent }) {
    return (
        <div className="score-board">
            <Score data={player} />
            <Score data={opponent} />
        </div>
    );
}
