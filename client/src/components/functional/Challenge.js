import React from "react";
import Stone, { stoneName } from "./Stone";

const Challenge = ({
  region,
  hiddenStones,
  challengeSelected,
  setChallengeSelected,
}) => {
  return (
    <div className="challenge">
      {hiddenStones.map((stone) => (
        <div className="challenge-stone">
          <Stone
            key={stone}
            name={stoneName(stone)}
            region={region}
            onClick={() => setChallengeSelected(stone)}
            clickable={true}
            challengeSelected={challengeSelected === stone}
          />
        </div>
      ))}
    </div>
  );
};

export default Challenge;
