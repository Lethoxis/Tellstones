import React, { useState, useEffect } from "react";

import StartMenu from "../functional/StartMenu.js";
import InputForm from "../functional/InputForm.js";
import Loading from "../functional/Loading";

import { Redirect } from "react-router-dom";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://http://192.168.0.15:4000";

const trimRoom = (str) =>
    str
        .replace(/[^a-z]/gi, "")
        .toUpperCase()
        .slice(0, 4);

function Start() {
    const [step, setStep] = useState(1);
    const [name, setName] = useState("");
    const [newGame, setNewGame] = useState(null);
    const [room, setRoom] = useState("");

    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(false);
    const [serverConfirmed, setServerConfirmed] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setSocket(socketIOClient(ENDPOINT));
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("newGameCreated", (room) => {
                setRoom(room);
                setServerConfirmed(true);
            });
            socket.on("joinConfirmed", () => {
                setServerConfirmed(true);
            });
            socket.on("errorMessage", (message) => displayError(message));
        }
    }, [socket]);

    const onChoice = (choice) => {
        setNewGame(choice === "new");
        stepForward();
    };

    const validate = () => {
        if (newGame) return name !== "";
        else return name !== "" && room !== "";
    };

    const onSubmit = () => {
        if (validate()) {
            setLoading(true);
            if (newGame) {
                socket.emit("newGame");
            } else {
                socket.emit("joining", { room: room });
            }
        } else {
            displayError(
                newGame
                    ? "Please fill out your name"
                    : "Please fill out your name and room id"
            );
        }
    };

    const stepBack = () => {
        setStep(step - 1);
    };

    const stepForward = () => {
        setStep(step + 1);
    };

    const onTyping = (e) => {
        const target = e.target.name;
        const value = e.target.value;

        if (target === "name")
            setName(value.slice(0, 1).toUpperCase() + value.slice(1));
        else setRoom(trimRoom(value));
    };

    const displayError = (message) => {
        setError(true);
        setErrorMessage(message);
        setLoading(false);
        setTimeout(() => {
            setError(false);
            setErrorMessage("");
        }, 3000);
    };

    if (serverConfirmed) {
        return <Redirect to={`/game?room=${room}&name=${name}`} />;
    } else {
        switch (step) {
            case 1:
                return <StartMenu onChoice={onChoice} />;
            case 2:
                return (
                    <>
                        <Loading loading={loading} />
                        <InputForm
                            stepBack={stepBack}
                            onSubmit={onSubmit}
                            onTyping={onTyping}
                            newGame={newGame}
                            name={name}
                            room={room}
                        />
                    </>
                );
            default:
                return null;
        }
    }
}

export default Start;
