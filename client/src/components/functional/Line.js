import React from "react";

import FlipMove from 'react-flip-move';
import Stone, { stoneName } from "./Stone";

const isVisible = (line, pool, highlightedStones, selectedStones, i) => {
    // If highlighted stones, nothing is visible
    if (highlightedStones.length > 0) return false;

    // If zero or two stones are selected, nothing is visible
    if (selectedStones.length === 0 || selectedStones.length === 2)
        return false;

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

const isClickable = (
    i,
    line,
    pool,
    phase,
    highlightedStones,
    selectedStones
) => {
    // If phase === 99 (boasting) only one stone is clickable at a time
    if (phase === 99) return selectedStones.length === 0;

    // If phase >= 15 (challenge or boast proposition in progress) nothing is clickable
    if (phase >= 15) return false;

    // If highlighted stones, only clickable what is highlighted
    if (highlightedStones.length > 0)
        return highlightedStones.includes(line[i]);

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
    } // If selected from line, can click on any line stone that was not already selected
    else return line[i] < 7 && line[i] !== selectedStones[0];
};

const Line = ({
    region,
    isPlayerTurn,
    line,
    hidden,
    pool,
    phase,
    highlightedStones,
    selectedStones,
    handleClickLine,
}) => {
    return (
        <div className="line">
            <img src={`/images/${region}/line.png`} alt="Line" style={{ width: "100%" }} />
            <div className="div-inside-line">
                <div className="line-stones">
                    <FlipMove typeName={null}>
                        {line.map((stone, i) => (
                            <Stone
                                key={stone}
                                name={stoneName(stone)}
                                region={region}
                                onClick={() => handleClickLine(stone)}
                                selected={selectedStones.includes(stone)}
                                highlighted={highlightedStones.includes(stone)}
                                peeked={
                                    phase === 14 &&
                                    !isPlayerTurn &&
                                    highlightedStones.includes(stone)
                                }
                                hidden={hidden[stone]}
                                visible={isVisible(
                                    line,
                                    pool,
                                    highlightedStones,
                                    selectedStones,
                                    i
                                )}
                                clickable={
                                    isPlayerTurn &&
                                    isClickable(
                                        i,
                                        line,
                                        pool,
                                        phase,
                                        highlightedStones,
                                        selectedStones
                                    )
                                }
                            />
                        ))}
                    </FlipMove>
                </div>
            </div>
        </div>
    );
};

export default Line;
