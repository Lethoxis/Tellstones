import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import regionStyles from "../../regionStyles";

import Status from "../functional/Status";
import ScoreBoard from "../functional/ScoreBoard";
import Line from "../functional/Line";
import Pool from "../functional/Pool";
import Options from "../functional/Options";

import io from "socket.io-client";
import qs from "qs";

const ENDPOINT = "https://tellstones-server.vercel.app";

const baseHidden = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
};

function Table() {
  const [region, setRegion] = useState(
    localStorage.getItem("tellstonesRegion") ?? "demacia"
  );

  const [line, setLine] = useState([10, 11, 12, 0, 1, 15, 16]);
  const [pool, setPool] = useState([2, 3, 4, 5, 6]);
  const [hidden, setHidden] = useState(baseHidden);
  const [selectedStones, setSelectedStones] = useState([]);
  const [highlightedStones, setHighlightedStones] = useState([]);
  const [number, setNumber] = useState(0);
  const [turn, setTurn] = useState(0);
  const [phase, setPhase] = useState(0);

  const [socket, setSocket] = useState(null);
  const [socketID, setSocketID] = useState(null);
  const [room, setRoom] = useState(null);
  const [currentPlayerScore, setCurrentPlayerScore] = useState(0);
  const [opponentPlayer, setOpponentPlayer] = useState(["Enemy", 0]);
  const [waiting, setWaiting] = useState(
    window.location.origin.includes("localhost") ? false : true
  );
  const [joinError, setJoinError] = useState(false);
  const [sendUpdate, setSendUpdate] = useState(false);

  // Setting the states to start a game when new user join
  const gameStart = (gameState, players, id) => {
    const opponent = players.filter((p) => p[0] !== id)[0][1];
    setOpponentPlayer([opponent, 0]);
    setLine(gameState.line);
    setPool(gameState.pool);
    setHidden(gameState.hidden);
    setSelectedStones([]);
    setHighlightedStones(gameState.highlightedStones);
    setPhase(gameState.phase);
    setTurn(gameState.turn);
  };

  const endGame = () => {
    setPhase(100);
    setHidden(baseHidden);
    setSelectedStones([]);
    setHighlightedStones([]);
  };

  useEffect(() => {
    // Getting the room and the username information from the url
    // Then emit to back end to process
    const socket = io(ENDPOINT, {
      path: "/socket.io",
      secure: true,
      transports: ["websocket", "polling"],
    });
    const { room, name } = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });
    setRoom(room);
    socket.emit("newRoomJoin", { room, name });

    // New user join, logic decide on backend whether to display
    // the actual game or the wait screen or redirect back to the main page
    socket.on("waiting", () => {
      setWaiting(true);
    });

    socket.on("joinError", () => setJoinError(true));

    socket.on(
      "numberAssignment",
      ({ number, id, gameState, players, region }) => {
        setNumber(number);
        setSocketID(id);
        setWaiting(false);
        setRegion(region);
        gameStart(gameState, players, id);
      }
    );

    socket.on("update", ({ gameState }) => handleUpdate(gameState));

    socket.on("updatePoints", ({ self, points }) =>
      handleUpdatePoints(self, points)
    );

    setSocket(socket);
  }, []);

  useEffect(() => {
    if (sendUpdate) {
      console.log("updating => server");
      const state = {
        line,
        pool,
        hidden,
        highlightedStones,
        turn,
        phase,
      };
      socket.emit("update", { room, id: socketID, state });
      setSendUpdate(false);
    }
  }, [sendUpdate]);

  // Changing style
  useEffect(() => {
    for (const [key, value] of Object.entries(regionStyles[region])) {
      document.querySelector("#root").style.setProperty(key, value);
    }
  }, [region]);

  // If current player points >= 3
  useEffect(() => {
    if (currentPlayerScore >= 3) endGame();
  }, [currentPlayerScore]);

  const handleClickPool = (stone) => {
    if (selectedStones.length === 1)
      setSelectedStones([stone, selectedStones[0]]);
    else setSelectedStones([stone]);
  };

  const handleClickLine = (stone) => {
    // Only change phase if it's < 10
    if (phase < 10) {
      if (selectedStones.length === 1) {
        // [1] Place a stone from the pool
        if (stone >= 7) setPhase(1);
        // [3] Swap two stones
        else if (stone !== selectedStones[0]) setPhase(3);
      }
      if (selectedStones.length === 0) {
        // [2] Hide a stone
        if (!hidden[stone]) setPhase(2);
        // [4] Peek a stone
        else setPhase(4);
      }
    }

    setSelectedStones([...selectedStones, stone]);
  };

  const handleChallenge = () => {
    if (phase < 10) setPhase(5);
    else setPhase(phase - (phase % 10) + 7);
  };

  const handleBoast = () => {
    if (phase === 0) setPhase(6);
    else setPhase(phase - (phase % 10) + 8);
  };

  const handleCancel = () => {
    if (phase < 10) setPhase(0);
    else if (phase > 16) setPhase(phase - (phase % 10) + 6);
    setSelectedStones([]);
  };

  const handleValidate = (challengeSelected = null) => {
    const [stone1, stone2] = selectedStones;
    const [i, j] = [line.indexOf(stone1), line.indexOf(stone2)];
    let newLine = [...line];
    let newHidden = { ...hidden };

    switch (phase) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        setHighlightedStones(selectedStones);
        break;

      // [6] Boast!
      case 6:
        break;

      // [11] Place a stone from the pool
      case 11:
        newLine[j] = stone1;
        setLine(newLine);
        setPool(pool.filter((s) => s !== stone1));
        break;

      // [12] Hide a stone
      case 12:
        newHidden[stone1] = true;
        setHidden(newHidden);
        break;

      // [13] Swap two stones
      case 13:
        [newLine[i], newLine[j]] = [newLine[j], newLine[i]];
        setLine(newLine);
        break;

      // [14] The enemy acknowledges the peeking
      case 14:
        break;

      // [15] The challenged player guesses the stone
      case 15:
        if (Number(challengeSelected) === Number(highlightedStones[0])) {
          socket.emit("pointsUpdate", {
            room,
            id: socketID,
            self: true,
            points: currentPlayerScore + 1,
          });
          setCurrentPlayerScore(currentPlayerScore + 1);
        } else {
          socket.emit("pointsUpdate", {
            room,
            id: socketID,
            self: false,
            points: opponentPlayer[1] + 1,
          });
          setOpponentPlayer([opponentPlayer[0], opponentPlayer[1] + 1]);
        }

        newHidden[highlightedStones[0]] = false;
        setHidden(newHidden);
        break;

      // [16, 26] Accept the boast, give a point the the opponent
      case 16:
      case 26:
        socket.emit("pointsUpdate", {
          room,
          id: socketID,
          self: false,
          points: opponentPlayer[1] + 1,
        });
        setOpponentPlayer([opponentPlayer[0], opponentPlayer[1] + 1]);
        break;

      // [99] Make a guess during boast
      case 99:
        // Incorrect guess
        if (Number(challengeSelected) !== Number(stone1)) {
          socket.emit("pointsUpdate", {
            room,
            id: socketID,
            self: false,
            points: 3,
          });
          setOpponentPlayer([opponentPlayer[0], 3]);
          endGame();
        } else {
          newHidden[stone1] = false;
          setHidden(newHidden);
          // Boast finished!
          if (!Object.values(newHidden).includes(true)) {
            socket.emit("pointsUpdate", {
              room,
              id: socketID,
              self: true,
              points: 3,
            });
            setCurrentPlayerScore(3);
            endGame();
          }
        }
        break;

      default:
        break;
    }

    if (phase < 10) {
      setPhase(phase + 10);
      setTurn(1 - turn);
    } else if (phase < 16 || phase % 10 === 6) {
      setPhase(0);
      setHighlightedStones([]);
      if (phase === 26) setTurn(1 - turn);
    } else if (phase % 10 === 7) {
      setPhase(99);
      setTurn(1 - turn);
    } else if (phase === 18) {
      setPhase(26);
      setTurn(1 - turn);
    }

    setSelectedStones([]);
    if (phase === 4) {
      setTimeout(() => {
        setSendUpdate(true);
      }, 4000);
    } else setSendUpdate(true);
  };

  const handleUpdate = (gameState) => {
    console.log("server => updating", gameState);
    setLine(gameState.line);
    setPool(gameState.pool);
    setHidden(gameState.hidden);
    setTurn(gameState.turn);
    setPhase(gameState.phase);
    setHighlightedStones(gameState.highlightedStones);
  };

  const handleUpdatePoints = (self, points) => {
    if (self) setCurrentPlayerScore(points);
    else setOpponentPlayer([opponentPlayer[0], points]);

    if (points >= 3) endGame();
  };

  ////////////////////////////////////////////////////////////////////////////////////////
  // Render
  if (joinError) {
    return <Redirect to={`/`} />;
  } else if (waiting) {
    return (
      <div className="waiting">
        <p>Room code :</p>
        <input type="text" value={room ?? "XXXX"} disabled />
        <p className="centered">Waiting for opponent...</p>
      </div>
    );
  } else {
    return (
      <div style={{ width: "95%" }}>
        <Status
          phase={phase}
          isPlayerTurn={number === turn}
          opponentName={opponentPlayer[0]}
          scores={[currentPlayerScore, opponentPlayer[1]]}
        />
        {window.location.origin.includes("localhost") && (
          <>
            <button onClick={() => setNumber(1 - number)}>Change player</button>
            <button onClick={() => setRegion("targon")}>Change region</button>
            <span>Phase: {phase}</span>
          </>
        )}
        <ScoreBoard
          player={["You", currentPlayerScore]}
          opponent={opponentPlayer}
        />
        <Line
          region={region}
          isPlayerTurn={number === turn}
          line={line}
          hidden={hidden}
          pool={pool}
          phase={phase}
          highlightedStones={highlightedStones}
          selectedStones={selectedStones}
          handleClickLine={handleClickLine}
        />
        <div className="below-line">
          <Options
            region={region}
            isPlayerTurn={number === turn}
            line={line}
            hidden={hidden}
            phase={phase}
            selectedStones={selectedStones}
            highlightedStones={highlightedStones}
            handleCancel={handleCancel}
            handleChallenge={handleChallenge}
            handleBoast={handleBoast}
            handleValidate={handleValidate}
          />
          <Pool
            region={region}
            isPlayerTurn={number === turn}
            pool={pool}
            phase={phase}
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
