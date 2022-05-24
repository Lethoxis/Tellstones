import React from 'react';

const phaseValidation = {
    0: "Select stones...",
    1: "Place stone",
    2: "Hide stone",
    3: "Swap stones",
    4: "Peek stone"
}

const Options = ({ phase, selectedStones, handleCancel, handleValidate }) => {
    return (
        <div>
            <button onClick={handleCancel} disabled={selectedStones.length === 0}>Cancel selection</button>
            
            <button onClick={handleValidate} disabled={phase === 0}>{phaseValidation[phase]}</button>
        </div>
    );
}

export default Options;
