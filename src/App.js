import React from "react";
import "./App.css";
import Profile from "./containers/Profile/Profile";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div style={{ height: "100vh" }}>
        <Switch>
          <Route exact path="/" component={Profile} />
          <Route exact path="/:q" component={Profile} />
          <Route exact path="/:q/:p" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
