import React, { useState } from "react";
import Challenge from "./Challenge";

const phaseValidation = {
    0: "Validate action",
    1: "Place stone",
    2: "Hide stone",
    3: "Swap stones",
    4: "Peek stone",
    5: "Challenge",
    6: "Boast",

    11: "Place stone",
    12: "Hide stone",
    13: "Swap stones",
    14: "Acknowledge",
    15: "Guess stone",

    16: "Give a point",
    17: "Let them boast",
    18: "I can boast too!",
    26: "Give a point",
    27: "Let them boast",
    99: "Guess stone",
};

const Options = ({
    isPlayerTurn,
    line,
    hidden,
    phase,
    selectedStones,
    highlightedStones,
    handleCancel,
    handleChallenge,
    handleBoast,
    handleValidate,
}) => {
    const [challengeSelected, setChallengeSelected] = useState(null);

    const challengable =
        phase === 16 ||
        phase === 26 ||
        (selectedStones.length !== 1
            ? false
            : line.includes(selectedStones[0]) && hidden[selectedStones[0]]);
    const boastable =
        Object.values(hidden).includes(true) && selectedStones.length === 0;
    const validatable =
        (phase > 0 && phase < 10) ||
        (phase > 10 &&
            phase < 15 &&
            highlightedStones.every((s) => selectedStones.includes(s))) ||
        (phase === 15 && challengeSelected) ||
        (phase > 15 && phase < 99) ||
        (phase === 99 && challengeSelected);

    const validateChallenge = () => {
        setChallengeSelected(null);
        handleValidate(challengeSelected);
    };

    return (
        <div className="options-challenge">
            <div className="options">
                <button
                    className="btn btn-square btn-cancel above-shadow"
                    onClick={handleCancel}
                    disabled={
                        phase === 99 ||
                        (phase % 10 < 7 &&
                            (!isPlayerTurn ||
                                (selectedStones.length === 0 && phase !== 6)))
                    }
                >
                    X
                </button>

                <button
                    className={
                        "btn btn-square above-shadow" +
                        (phase === 5 || phase % 10 === 7 ? " selected" : "")
                    }
                    onClick={handleChallenge}
                    disabled={!isPlayerTurn || !challengable || phase === 14}
                >
                    <img
                        className="options-img"
                        src={process.env.PUBLIC_URL + "/images/challenge.png"}
                        alt="Challenge"
                    />
                </button>

                <button
                    className="btn above-shadow"
                    onClick={
                        phase === 15 || phase === 99
                            ? validateChallenge
                            : handleValidate
                    }
                    disabled={!isPlayerTurn || !validatable}
                >
                    {isPlayerTurn ? phaseValidation[phase || 0] : ""}
                </button>

                <button
                    className={
                        "btn btn-square above-shadow" +
                        (phase === 6 || phase % 10 === 8 ? " selected" : "")
                    }
                    onClick={handleBoast}
                    disabled={
                        !isPlayerTurn ||
                        !boastable ||
                        (phase !== 0 && phase !== 16)
                    }
                >
                    <img
                        className="options-img"
                        src={process.env.PUBLIC_URL + "/images/flag.png"}
                        alt="Boast"
                    />
                </button>
            </div>
            {(phase === 15 || phase === 99) && isPlayerTurn && (
                <Challenge
                    hiddenStones={Object.entries(hidden)
                        .filter((s) => s[1])
                        .map((s) => s[0])}
                    challengeSelected={challengeSelected}
                    setChallengeSelected={setChallengeSelected}
                />
            )}
        </div>
    );
};

export default Options;
