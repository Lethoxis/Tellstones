import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Start from "./components/pages/Start";
import Table from "./components/pages/Table";

const Game = () => (
  <Router>
    <Route path="/" exact component={Start} />
    <Route path="/game" component={Table} />
  </Router>
);

export default Game;
