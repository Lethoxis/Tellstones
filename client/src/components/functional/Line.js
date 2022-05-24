import React from "react";
import Stone, { stoneName } from "./Stone";

const isVisible = (line, pool, selectedStones, i) => {
    // If zero or two stones are selected, nothing is visible
    if (selectedStones.length === 0 || selectedStones.length === 2) return false;
    
    // If the stone is not blank
    if (line[i] < 7) return true;

    // Check neighbors
    if (pool.includes(selectedStones[0])) {
        if (i === 0) return line[1] < 7;
        if (i === 6) return line[5] < 7;
        return line[i - 1] < 7 || line[i + 1] < 7;
    }
    return false;
};

const isClickable = (line, pool, selectedStones, i) => {
    // If two stones are selected, nothing is clickable
    if (selectedStones.length === 2) return false;

    // If nothing is selected, every non-blank stone is clickable
    if (selectedStones.length === 0) return line[i] < 7;

    // If selected from pool
    if (pool.includes(selectedStones[0])) {
        if (line[i] < 7) return false;
        if (i === 0) return line[1] < 7;
        if (i === 6) return line[5] < 7;
        return line[i - 1] < 7 || line[i + 1] < 7;
    } // If selected from line, can click on any line stone
    else return line[i] < 7;
};

const Line = ({ line, hidden, pool, highlightedStones, selectedStones, handleClickLine }) => {
    return (
        <div className="line">
            <img
                src="https://media.discordapp.net/attachments/805735229359783966/976799574041702421/ligne.png"
                alt="Line"
                style={{ width: "100%" }}
            />
            <div className="div-inside-line">
                <div className="line-stones">
                    {line.map((stone, i) => (
                        <div key={stone}>
                            <Stone
                                name={stoneName(stone)}
                                onClick={() => handleClickLine(stone)}
                                selected={selectedStones.includes(stone)}
                                selectedTwice={selectedStones.length === 2 && selectedStones[0] === stone && selectedStones[1] === stone}
                                highlighted={highlightedStones.includes(stone)}
                                hidden={hidden[stone]}
                                visible={isVisible(
                                    line,
                                    pool,
                                    selectedStones,
                                    i
                                )}
                                clickable={isClickable(
                                    line,
                                    pool,
                                    selectedStones,
                                    i
                                )}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Line;
