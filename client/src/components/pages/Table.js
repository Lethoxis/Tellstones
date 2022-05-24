import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Line from "../functional/Line";
import Pool from "../functional/Pool";
import Options from "../functional/Options";

import io from "socket.io-client";
import qs from "qs";

const ENDPOINT = "";

function Table() {
    const [line, setLine] = useState([10, 11, 12, 4, 14, 15, 16]);
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
    const [selectedStones, setSelectedStones] = useState([]);
    const [highlightedStones, setHighlightedStones] = useState([3,4]);
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
        setSelectedStones([stone]);
    };

    // Click on a line stone
    const handleClickLine = (stone) => {
        if (selectedStones.length === 1) {
            // [1] Place a stone from the pool
            if (stone >= 7) setPhase(1);
            // [2] Hide a stone
            else if (stone === selectedStones[0] && !hidden[stone]) setPhase(2);
            // [3] Swap two stones
            else if (stone !== selectedStones[0])  setPhase(3);
            // [4] Peek a stone
            else if (stone === selectedStones[0] && hidden[stone]) setPhase(4);
        }
        
        setSelectedStones([...selectedStones, stone]);
    };

    const handleCancel = () => {
        setPhase(0);
        setSelectedStones([]);
    }

    const handleValidate = () => {
        const [stone1, stone2] = selectedStones;
        const [i, j] = [line.indexOf(stone1), line.indexOf(stone2)];

        // [1] Place a stone from the pool
        if (stone2 >= 7) {
            let newLine = [...line];
            newLine[j] = stone1;
            setLine(newLine);
            setPool(pool.filter((s) => s !== stone1));
            setSelectedStones([]);
        }
        // [2] Hide a stone
        else if (stone1 === stone2 && !hidden[stone1]) {
            let newHidden = { ...hidden };
            newHidden[stone1] = true;
            setHidden(newHidden);
            setSelectedStones([]);
        }
        // [3] Swap two stones
        else if (stone1 !== stone2) {
            let newLine = [...line];
            [newLine[i], newLine[j]] = [newLine[j], newLine[i]];
            setLine(newLine);
            setSelectedStones([]);
        }
        // [4] Peek a stone
        else if (stone1 === stone2 && hidden[stone1]) {
            let newHidden = { ...hidden };
            newHidden[stone1] = false;
            setHidden(newHidden);
            setSelectedStones([]);
            // Displaying what the stone is
        }

        setPhase(0);
    }

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
                    width: "100%"
                }}
            >
                <h1>Tellstones</h1>
                <Line
                    line={line}
                    hidden={hidden}
                    pool={pool}
                    highlightedStones={highlightedStones}
                    selectedStones={selectedStones}
                    handleClickLine={handleClickLine}
                />
                <div className="below-line">
                    <Options
                        phase={phase}
                        selectedStones={selectedStones}
                        handleCancel={handleCancel}
                        handleValidate={handleValidate}
                    />
                    <Pool
                        pool={pool}
                        highlightedStones={highlightedStones}
                        selectedStones={selectedStones}
                        handleClickPool={handleClickPool}
                    />
                </div>
            </div>
        );
    }
}

export default Table;
