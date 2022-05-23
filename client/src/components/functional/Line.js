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
    // If nothing is selected, every non-blank stone is clickable
    if (selectedStone === null) return line[i] !== 8;

    // If selected from pool
    if (pool.includes(selectedStone)) {
        if (line[i] !== 8) return false;
        if (i === 0) return line[1] !== 8;
        if (i === 6) return line[5] !== 8;
        return line[i - 1] !== 8 || line[i + 1] !== 8;
    } // If selected from line, can click on any line stone
    else return line[i] !== 8;
};

const Line = ({ line, hidden, pool, selectedStone, handleClickLine }) => {
    console.log("Line:", line);
    return (
        <div className="line">
            <img
                src="https://media.discordapp.net/attachments/805735229359783966/976799574041702421/ligne.png"
                alt="Line"
                style={{ width: "100%" }}
            />
            <div className="line-stones">
                {line.map((stone, i) => (
                    <div
                        key={`${stone} ${i}`}
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
                            selected={selectedStone === stone}
                            hidden={hidden[stone]}
                            visible={isVisible(
                                line,
                                pool,
                                selectedStone,
                                i
                            )}
                            clickable={isClickable(
                                line,
                                pool,
                                selectedStone,
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
