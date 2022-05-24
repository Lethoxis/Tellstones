import React from "react";
import Stone, { stoneName } from "./Stone";

const Pool = ({ pool, highlightedStones, selectedStones, handleClickPool }) => {
    return (
        <div className="pool">
            {pool.map((stone) => (
                <div key={stone} className="pool-stone">
                    <Stone
                        name={stoneName(stone)}
                        onClick={() => handleClickPool(stone)}
                        selected={selectedStones.includes(stone)}
                        highlighted={highlightedStones.includes(stone)}
                        clickable={selectedStones.length === 0}
                    />
                </div>
            ))}
        </div>
    );
};

export default Pool;
