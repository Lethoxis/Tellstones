import React from "react";
import Stone, { StoneNames } from "./Stone";

const Pool = ({ pool, selectedStone, handleClickPool }) => {
    console.log(selectedStone, selectedStone == null);
    return (
        <div className="pool">
            {pool.map((stone) => (
                <div key={stone} className="pool-stone">
                    <Stone
                        name={StoneNames[stone]}
                        onClick={() => handleClickPool(stone)}
                        selected={selectedStone === stone}
                        clickable={selectedStone == null}
                    />
                </div>
            ))}
        </div>
    );
};

export default Pool;
