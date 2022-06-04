import React from "react";

export default function Score({ data }) {
    return (
        <div className="score">
            <h2>{`${data[0]} : ${data[1]}`}</h2>
        </div>
    );
}
