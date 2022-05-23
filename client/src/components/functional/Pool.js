import React from "react";
import Stone, { StoneNames } from "./Stone";

const Pool = ({ pool, selectedStone, handleClickPool }) => {
    console.log(selectedStone, selectedStone == null);
    return (
        <div style={{ flexDirection: "column" }}>
            {pool.map((stone) => (
                <div
                    key={stone}
                    style={{
                        height: "100px",
                        width: "100px",
                        borderRadius: "50px",
                        margin: "5px 5px 10px",
                    }}
                >
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
