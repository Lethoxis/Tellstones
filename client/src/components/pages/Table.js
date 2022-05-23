import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Line from "../functional/Line";
import Pool from "../functional/Pool";
import Options from "../functional/Options";

import io from "socket.io-client";
import qs from "qs";

const ENDPOINT = "";

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            line: [8, 8, 8, 4, 8, 8, 8],
            pool: [0, 1, 2, 3, 5, 6],
            selectedStone: null,
            turn: true,
            end: false,

            room: "",
            statusMessage: "",
            currentPlayerScore: 0,
            opponentPlayer: [],
            //State to check when a new user join
            waiting: false,
            joinError: false,
        };
        this.socketID = null;
    }

    componentDidMount() {
        /*
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
      this.socketID = id
    })

    //Game play logic events
    this.socket.on('update', ({gameState, turn}) => this.handleUpdate(gameState, turn))
    this.socket.on('winner', ({gameState, id}) => this.handleWin(id, gameState))
    this.socket.on('draw', ({gameState}) => this.handleDraw(gameState))

    this.socket.on('restart', ({gameState, turn}) => this.handleRestart(gameState, turn))
  */
    }

    //Setting the states to start a game when new user join
    gameStart(gameState, players, turn) {
        const opponent = players.filter(
            ([id, name]) => id !== this.socketID
        )[0][1];
        this.setState({ opponentPlayer: [opponent, 0], end: false });
        this.setBoard(gameState);
        this.setTurn(turn);
        this.setMessage();
    }

    // Click on a pool stone
    handleClickPool = (stone) => {
        console.log(stone);
        let { selectedStone } = this.state;

        if (selectedStone === stone) selectedStone = null;
        else selectedStone = stone;

        this.setState({ selectedStone });
    };

    // Click on a line stone
    handleClickLine = (stone, i) => {
        console.log("clickLine", stone, i);
        let { pool, line, selectedStone } = this.state;

        // Place a stone from the pool
        if (stone === 8) {
            pool = pool.filter((s) => s !== selectedStone);
            line[i] = selectedStone;
            console.log(pool, line);
            this.setState({ pool, line, selectedStone: null });
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
        if (this.socketID === id) {
            const playerScore = this.state.currentPlayerScore + 1;
            this.setState({
                currentPlayerScore: playerScore,
                statusMessage: "You Win",
            });
        } else {
            const opponentScore = this.state.opponentPlayer[1] + 1;
            const opponent = this.state.opponentPlayer;
            opponent[1] = opponentScore;
            this.setState({
                opponentPlayer: opponent,
                statusMessage: `${this.state.opponentPlayer[0]} Wins`,
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
        this.socket.emit("playAgainRequest", this.state.room);
    };

    //Handle the restart event from the back end
    handleRestart(gameState, turn) {
        this.setBoard(gameState);
        this.setTurn(turn);
        this.setMessage();
        this.setState({ end: false });
    }*/

    render() {
        if (this.state.joinError) {
            return <Redirect to={`/`} />;
        } else {
            return (
                <>
                    <div
                        style={{
                            color: "white",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            width: "100%",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                                alignItems: "center",
                                width: "1300px",
                                minWidth: "1300px",
                            }}
                        >
                            <Line
                                state={this.state}
                                handleClickLine={this.handleClickLine}
                            />
                            <Options />
                        </div>
                        <Pool
                            state={this.state}
                            handleClickPool={this.handleClickPool}
                        />
                    </div>
                </>
            );
        }
    }
}

export default Table;
