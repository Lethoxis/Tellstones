import React from "react";

const images = (stoneName) => `/images/${stoneName}.png`;

export const stoneName = (stone) => {
    if (stone < 7)
        return [
            "Sword",
            "Shield",
            "Horse",
            "Crown",
            "Hammer",
            "Scales",
            "Flag",
        ][stone];
    else return "Blank";
};

const Stone = ({
    name,
    onClick,
    selected,
    challengeSelected = false,
    highlighted = false, // Has to be selected by the opponent
    peeked = false, // Being peeked by the current player
    visible = true, // Has contour
    hidden = false, // Face down
    clickable = false,
}) => {
    // Blank stone
    if (name === "Blank")
        return (
            <img
                className={
                    "stone blank" +
                    (visible ? " visible" : "") +
                    (selected ? " selected" : "") +
                    (clickable ? " clickable" : "") +
                    (highlighted ? " highlighted" : "")
                }
                src={images("blank")}
                alt={name}
                onClick={clickable ? onClick : null}
            />
        );

    // Normal stones
    const stoneClass =
        "stone" +
        (selected ? " selected" : "") +
        (challengeSelected ? " challenge-selected" : "") +
        (clickable ? " clickable" : "") +
        (highlighted && !peeked ? " highlighted" : "") +
        (peeked ? " peeked" : "");

    return (
        <div
            className={
                "flip-stone" +
                (hidden && !peeked ? " hidden" : "") +
                (peeked ? " peeked" : "")
            }
        >
            <div className="flip-stone-inner">
                <div className="flip-stone-front">
                    <img
                        className={stoneClass}
                        src={images(name)}
                        alt={name}
                        onClick={clickable ? onClick : null}
                    />
                </div>
                <div className="flip-stone-back">
                    <img
                        className={stoneClass}
                        src={images("hidden")}
                        alt={name}
                        onClick={clickable ? onClick : null}
                    />
                </div>
            </div>
        </div>
    );
};

export default Stone;
