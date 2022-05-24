import React from "react";

const images = (stoneName) => process.env.PUBLIC_URL + "/images/"+ stoneName +".png"

const Links = {
    Sword: process.env.PUBLIC_URL + "/images/sword.png",
    Shield: "https://media.discordapp.net/attachments/805735229359783966/976799524536332298/bouclier.png",
    Horse: "https://media.discordapp.net/attachments/805735229359783966/976799524750250024/chevalier.png",
    Crown: "https://media.discordapp.net/attachments/805735229359783966/976799524959969340/couronne.png",
    Hammer: "https://media.discordapp.net/attachments/805735229359783966/976799523999473694/marteau.png",
    Scales: "https://media.discordapp.net/attachments/805735229359783966/976799524276305950/balance.png",
    Flag: "https://media.discordapp.net/attachments/805735229359783966/976799523093487616/drapeau.png",
    Hidden: "https://media.discordapp.net/attachments/805735229359783966/976799523731017748/hidden.png",
};

export const stoneName = (stone) => {
    if (stone < 7) return [
        "Sword",
        "Shield",
        "Horse",
        "Crown",
        "Hammer",
        "Scales",
        "Flag"
    ][stone]
    else return "Blank"
};

const Stone = ({
    name,
    onClick,
    selected,
    selectedTwice = false,
    highlighted = false, // Has to be selected by the opponent
    visible = true, // Has contour
    hidden = false, // Face down
    clickable = false,
}) => {
    // Blank stone
    if (name === "Blank")
        return (
            <div
                className={
                    "stone blank" +
                    (visible ? " visible" : "") +
                    (selected ? " selected" : "") +
                    (clickable ? " clickable" : "") +
                    (highlighted ? " highlighted" : "")
                }
                onClick={clickable ? onClick : null}
            />
        );

    // Normal stones
    return (
        <img
            className={
                "stone" +
                (selected ? " selected" : "") +
                (selectedTwice ? " selected-twice" : "") +
                (clickable ? " clickable" : "") +
                (highlighted ? " highlighted" : "")
            }
            src={hidden ? images("hidden") : images(name)}
            alt={name}
            onClick={clickable ? onClick : null}
        />
    );
};

export default Stone;
