import React from "react";
import Stone, { stoneName } from "./Stone";

const Pool = ({
    region,
    isPlayerTurn,
    pool,
    phase,
    highlightedStones,
    selectedStones,
    handleClickPool,
}) => {
    return (
        <div className="pool">
            {pool.map((stone) => (
                <div key={stone} className="pool-stone">
                    <Stone
                        name={stoneName(stone)}
                        region={region}
                        onClick={() => handleClickPool(stone)}
                        selected={selectedStones.includes(stone)}
                        highlighted={highlightedStones.includes(stone)}
                        clickable={isPlayerTurn &&
                            ((phase === 0 && selectedStones.length === 0) ||
                            (phase === 11 && highlightedStones.includes(stone)))
                        }
                    />
                </div>
            ))}
        </div>
    );
};

export default Pool;
