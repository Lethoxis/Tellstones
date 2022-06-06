import React from "react";

const message = (phase, isPlayerTurn, opponentName, scores) => {
    if (scores[0] >= 3) return `You won!`;
    if (scores[1] >= 3) return `${opponentName} won!`;
    if (phase === 100) return `End of the game`;

    if (isPlayerTurn) {
        if (phase < 10) return `Your turn`;
        return {
            11: `Place this stone`,
            12: `Hide this stone`,
            13: `Swap these stones`,
            14: `${opponentName} is peeking this stone`,
            15: `${opponentName} challenged you to guess this stone`,
            16: `${opponentName} boasts!`,
            17: `${opponentName} boasts!`,
            18: `${opponentName} boasts!`,
            26: `${opponentName} boasts back!`,
            27: `${opponentName} boasts back!`,
            99: `You are boasting!`,
        }[phase];
    } else {
        if (phase < 10) return `${opponentName}'s turn`;
        return {
            11: `${opponentName} is placing the stone`,
            12: `${opponentName} is hiding the stone`,
            13: `${opponentName} is swapping the stones`,
            14: `${opponentName} is acknowledging your peek`,
            15: `You challenged ${opponentName} with this stone`,
            16: `${opponentName} is answering your boast`,
            17: `${opponentName} is answering your boast`,
            18: `${opponentName} is answering your boast`,
            26: `${opponentName} is answering your boast`,
            27: `${opponentName} is answering your boast`,
            99: `${opponentName} is boasting!`,
        }[phase];
    }
};

export default function Status({ phase, isPlayerTurn, opponentName, scores }) {
    return (
        <div className="status">
            <h1 className={"status-message" + (isPlayerTurn ? "" : " enemy")}>
                {message(phase, isPlayerTurn, opponentName, scores)}
            </h1>
        </div>
    );
}
