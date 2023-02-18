import React, { forwardRef } from "react";

const images = (stoneName, region) => `/images/${region}/${stoneName}.png`;

export const stoneName = (stone) => {
  if (stone < 7) return ["0", "1", "2", "3", "4", "5", "6"][stone];
  else return "Blank";
};

const Stone = forwardRef(
  (
    {
      name,
      region,
      onClick,
      selected,
      challengeSelected = false,
      highlighted = false, // Has to be selected by the opponent
      peeked = false, // Being peeked by the current player
      visible = true, // Has contour
      hidden = false, // Face down
      clickable = false,
    },
    ref
  ) => {
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
          src={images("blank", region)}
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
        ref={ref}
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
              src={images(name, region)}
              alt={name}
              onClick={clickable ? onClick : null}
            />
          </div>
          <div className="flip-stone-back">
            <img
              className={stoneClass}
              src={images("hidden", region)}
              alt={name}
              onClick={clickable ? onClick : null}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default Stone;
