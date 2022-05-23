import React from "react";

const Links = {
    Sword: "https://media.discordapp.net/attachments/805735229359783966/976799523420635208/epee.png",
    Shield: "https://media.discordapp.net/attachments/805735229359783966/976799524536332298/bouclier.png",
    Horse: "https://media.discordapp.net/attachments/805735229359783966/976799524750250024/chevalier.png",
    Crown: "https://media.discordapp.net/attachments/805735229359783966/976799524959969340/couronne.png",
    Hammer: "https://media.discordapp.net/attachments/805735229359783966/976799523999473694/marteau.png",
    Scales: "https://media.discordapp.net/attachments/805735229359783966/976799524276305950/balance.png",
    Flag: "https://media.discordapp.net/attachments/805735229359783966/976799523093487616/drapeau.png",
    Hidden: "https://media.discordapp.net/attachments/805735229359783966/976799523731017748/hidden.png",
};

export const StoneNames = [
    "Sword",
    "Shield",
    "Horse",
    "Crown",
    "Hammer",
    "Scales",
    "Flag",
    "Hidden",
    "Blank",
];

const Stone = ({
    name,
    onClick,
    selected,
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
                    (clickable ? " clickable" : "")
                }
                onClick={clickable ? onClick : null}
            />
        );

    // Normal stones
    return (
        <img
            className={
                "stone" +
                (clickable ? " clickable" : "") +
                (selected ? " selected" : "")
            }
            src={hidden ? Links.Hidden : Links[name]}
            alt={name}
            onClick={clickable ? onClick : null}
        />
    );
};

export default Stone;
