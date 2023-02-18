import React from "react";

const ChoiceButton = ({ choice, label, onChoice }) => {
  return (
    <button
      className={`btn btn-menu btn-${choice}`}
      onClick={() => onChoice(choice)}
    >
      {label}
    </button>
  );
};

export default ChoiceButton;
