import React from "react";
import Stone, { StoneNames } from "./Stone";

const Pool = ({ state, handleClickPool }) => {
    console.log(state.selectedStone, state.selectedStone == null);
    return (
        <div style={{ flexDirection: "column" }}>
            {state.pool.map((stone) => (
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
                        selected={state.selectedStone === stone}
                        clickable={state.selectedStone == null}
                    />
                </div>
            ))}
        </div>
    );
};

export default Pool;
