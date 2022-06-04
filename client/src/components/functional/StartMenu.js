import React from "react";
import ChoiceButton from "./ChoiceButton";

const logo = process.env.PUBLIC_URL + "/images/logo.svg";

const StartMenu = ({ onChoice }) => {
    return (
        <div className="choice-container">
            <img src={logo} alt="Tellstones King's Gambit" />
            <div className="choice-buttons">
                <ChoiceButton
                    onChoice={onChoice}
                    choice="new"
                    label="Start New"
                />
                <ChoiceButton
                    onChoice={onChoice}
                    choice="join"
                    label="Join Game"
                />
            </div>
        </div>
    );
};

export default StartMenu;
