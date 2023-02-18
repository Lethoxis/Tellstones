import React from "react";

export default function Score({ points, reverse }) {
  return (
    <div className={"score" + (reverse ? " reverse" : "")}>
      {[1, 2, 3].map((s) => (
        <button
          key={s}
          className={
            "btn btn-square above-shadow" +
            (points >= s ? " selected" : "") +
            (points === s ? " current" : "") +
            (reverse ? " reverse" : "")
          }
          onClick={null}
          disabled={true}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
