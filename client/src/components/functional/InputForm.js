import React from "react";
import Input from "./Input.js";
import ChoiceButton from "./ChoiceButton";

const nextRegion = (region) => {
    return {
        "demacia": "piltover",
        "piltover": "demacia"
    }[region];
}

const InputForm = ({ stepBack, onSubmit, onTyping, newGame, name, room, region, setRegion }) => {
    if (newGame) {
        return (
            <div className="input-container">
                <div style={{"display": "flex"}}>
                    <Input
                        name="name"
                        placeholder="Your Name"
                        onChange={onTyping}
                        value={name}
                    />
                    <div
                        className="region-selector"
                        type="text"
                        name={name}
                        id={name}
                        value={region}
                        onClick={() => setRegion(nextRegion(region))}
                        disabled
                    >
                        <img src={`/images/${region}/region.png`} alt={region}/>
                    </div>
                </div>
                <div className="choice-buttons back-submit">
                    <ChoiceButton
                        choice="back"
                        onChoice={stepBack}
                        label="Back"
                    />
                    <ChoiceButton
                        choice="submit"
                        onChoice={onSubmit}
                        label="Start!"
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div className="input-container">
                <Input
                    name="name"
                    placeholder="Your Name"
                    onChange={onTyping}
                    value={name}
                />
                <Input
                    name="room"
                    placeholder="____"
                    onChange={onTyping}
                    value={room}
                />
                <div className="choice-buttons back-submit">
                    <ChoiceButton
                        choice="back"
                        onChoice={stepBack}
                        label="Back"
                    />
                    <ChoiceButton
                        choice="submit"
                        onChoice={onSubmit}
                        label="Start!"
                    />
                </div>
            </div>
        );
    }
};

export default InputForm;
