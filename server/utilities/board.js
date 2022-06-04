const { randNumber } = require("./utils");

class Board {
    constructor() {
        const firstStone = randNumber(6);
        const pool = [0, 1, 2, 3, 4, 5, 6].filter((s) => s !== firstStone);
        this.game = {
            line: [10, 11, 12, firstStone, 14, 15, 16],
            pool: pool,
            hidden: {
                0: false,
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
            },
            highlightedStones: [],
            turn: 0,
            phase: 0,
        };
        this.turn = 0;
        this.end = false;
    }

    update(gameState) {
        this.game = gameState;
    }

    switchTurn() {
        this.turn = 1 - this.turn;
    }
}

module.exports = Board;
