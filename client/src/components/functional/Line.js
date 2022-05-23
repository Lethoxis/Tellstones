import React from "react";
import Stone, { StoneNames } from "./Stone";

const isVisible = (line, pool, selectedStone, i) => {
    if (line[i] !== 8) return true;
    if (pool.includes(selectedStone)) {
        if (i === 0) return line[1] !== 8;
        if (i === 6) return line[5] !== 8;
        return line[i - 1] !== 8 || line[i + 1] !== 8;
    }
    return false;
};

const isClickable = (line, pool, selectedStone, i) => {
    if (selectedStone === null) return true;

    if (line[i] !== 8) return false;
    // If selected from pool
    if (pool.includes(selectedStone)) {
        if (line[i] !== 8) return false;
        if (i === 0) return line[1] !== 8;
        if (i === 6) return line[5] !== 8;
        return line[i - 1] !== 8 || line[i + 1] !== 8;
    } // If selected from line, can click on another stone (or the same one)
    else return line[i] !== 8;
};

const Line = ({ state, handleClickLine }) => {
    return (
        <div className="line">
            <img
                src="https://media.discordapp.net/attachments/805735229359783966/976799574041702421/ligne.png"
                alt="Line"
                style={{ width: "100%" }}
            />
            <div
                className="line-stones"
                style={{ display: "flex", justifyContent: "center" }}
            >
                {state.line.map((stone, i) => (
                    <div
                        key={stone + i}
                        style={{
                            height: "140px",
                            width: "140px",
                            borderRadius: "70px",
                            margin: "0px 5px",
                        }}
                    >
                        <Stone
                            name={StoneNames[stone]}
                            onClick={() => handleClickLine(stone, i)}
                            selected={state.selectedStone === stone}
                            visible={isVisible(
                                state.line,
                                state.pool,
                                state.selectedStone,
                                i
                            )}
                            clickable={isClickable(
                                state.line,
                                state.pool,
                                state.selectedStone,
                                i
                            )}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Line;
