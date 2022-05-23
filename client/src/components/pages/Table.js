import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Line from "../functional/Line";
import Pool from "../functional/Pool";
import Options from "../functional/Options";

import io from "socket.io-client";
import qs from "qs";

const ENDPOINT = "";

function Table() {
    const [line, setLine] = useState([8, 8, 8, 4, 8, 8, 8]);
    const [pool, setPool] = useState([0, 1, 2, 3, 5, 6]);
    const [hidden, setHidden] = useState({
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
    });
    const [selectedStone, setSelectedStone] = useState(null);
    const [highlightedStones, setHighlightedStones] = useState([]);
    const [turn, setTurn] = useState(true);
    const [phase, setPhase] = useState(0);
    const [end, setEnd] = useState(false);
    const [socketID, setSocketID] = useState(null);
    const [joinError, setJoinError] = useState(false);

    /*state = {
        room: "",
        statusMessage: "",
        currentPlayerScore: 0,
        opponentPlayer: [],
        //State to check when a new user join
        waiting: false,
    }*/

    /*componentDidMount() {
    //Getting the room and the username information from the url
    //Then emit to back end to process
    this.socket = io(ENDPOINT)
    const {room, name} = qs.parse(window.location.search, {
      ignoreQueryPrefix: true
    })
    this.setState({room})
    this.socket.emit('newRoomJoin', {room, name})

    //New user join, logic decide on backend whether to display 
    //the actual game or the wait screen or redirect back to the main page
    this.socket.on('waiting', () => this.setState({waiting: true, currentPlayerScore: 0, opponentPlayer: []}))
    this.socket.on('starting', ({gameState, players, turn}) => {
      this.setState({waiting: false})
      this.gameStart(gameState, players, turn)
    })
    this.socket.on('joinError', () => this.setState({joinError: true}))

    //Listening to the assignment of piece store the piece along with the in state
    //socket id in local socketID variable
    this.socket.on('pieceAssignment', ({piece, id}) => {
      this.setState({piece: piece})
      socketID = id
    })

    //Game play logic events
    this.socket.on('update', ({gameState, turn}) => this.handleUpdate(gameState, turn))
    this.socket.on('winner', ({gameState, id}) => this.handleWin(id, gameState))
    this.socket.on('draw', ({gameState}) => this.handleDraw(gameState))

    this.socket.on('restart', ({gameState, turn}) => this.handleRestart(gameState, turn))
    }*/

    //Setting the states to start a game when new user join
    const gameStart = (gameState, players, turn) => {
        const opponent = players.filter(([id, name]) => id !== socketID)[0][1];
        this.setState({ opponentPlayer: [opponent, 0], end: false });
        this.setBoard(gameState);
        this.setTurn(turn);
        this.setMessage();
    };

    // Click on a pool stone
    const handleClickPool = (stone) => {
        console.log(stone);

        if (selectedStone === stone) setSelectedStone(null);
        else setSelectedStone(stone);
    };

    // Click on a line stone
    const handleClickLine = (stone, i) => {
        console.log("clickLine", stone, i);

        // Select a stone from the line
        if (selectedStone === null) {
            setSelectedStone(stone);
        }

        // [1] Place a stone from the pool
        else if (stone === 8) {
            setPhase(1);

            let newLine = [...line];
            newLine[i] = selectedStone;
            setLine(newLine);
            setPool(pool.filter((s) => s !== selectedStone));
            setSelectedStone(null);
        }
        // [2] Hide a stone
        else if (stone === selectedStone && !hidden[stone]) {
            setPhase(2);

            let newHidden = { ...hidden };
            newHidden[stone] = true;
            setHidden(newHidden);
            setSelectedStone(null);
        }
        // [3] Swap two stones
        else if (stone !== selectedStone) {
            setPhase(3);

            let newLine = [...line];
            const j = line.indexOf(selectedStone);
            [newLine[i], newLine[j]] = [newLine[j], newLine[i]];
            setLine(newLine);
            setSelectedStone(null);
        }
        // [4] Peek a stone
        else if (stone === selectedStone && hidden[stone]) {
            setPhase(4);

            // Displaying what the stone is
        }
    };

    //Setting the states each move when the game haven't ended (no wins or draw)
    /*handleUpdate(gameState, turn) {
        this.setBoard(gameState);
        this.setTurn(turn);
        this.setMessage();
    }

    //Setting the states when some one wins
    handleWin(id, gameState) {
        this.setBoard(gameState);
        if (socketID === id) {
            const playerScore = currentPlayerScore + 1;
            this.setState({
                currentPlayerScore: playerScore,
                statusMessage: "You Win",
            });
        } else {
            const opponentScore = opponentPlayer[1] + 1;
            const opponent = opponentPlayer;
            opponent[1] = opponentScore;
            this.setState({
                opponentPlayer: opponent,
                statusMessage: `${opponentPlayer[0]} Wins`,
            });
        }
        this.setState({ end: true });
    }

    //Setting the states when there is a draw at the end
    handleDraw(gameState) {
        this.setBoard(gameState);
        this.setState({ end: true, statusMessage: "Draw" });
    }

    playAgainRequest = () => {
        this.socket.emit("playAgainRequest", room);
    };

    //Handle the restart event from the back end
    handleRestart(gameState, turn) {
        this.setBoard(gameState);
        this.setTurn(turn);
        this.setMessage();
        this.setState({ end: false });
    }*/

    if (joinError) {
        return <Redirect to={`/`} />;
    } else {
        console.log("LINE", line, "POOL", pool);
        return (
            <div
                style={{
                    color: "white",
                    width: "100%",
                }}
            >
                <Line
                    line={line}
                    hidden={hidden}
                    pool={pool}
                    selectedStone={selectedStone}
                    handleClickLine={handleClickLine}
                />
                <div className="below-line">
                    <Options />
                    <Pool
                        pool={pool}
                        selectedStone={selectedStone}
                        handleClickPool={handleClickPool}
                    />
                </div>
            </div>
        );
    }
}

export default Table;
