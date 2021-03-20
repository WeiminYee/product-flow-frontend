import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import ScenariosList from "./components/ScenariosList";
import AddScenario from "./components/AddScenario2";
import Content from "./components/Content2";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark" style={{'z-index':'2147483647', 'position':"relative"}}>
        <a href="/" className="navbar-brand">
          SCViz
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/scenarios"} className="nav-link">
              Supply Chain Scenarios
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add a Supply Chain Scenario
            </Link>
          </li>
        </div>
      </nav>

      <div>
        <Switch>
          <Route exact path={["/", "/scenarios"]} component={ScenariosList} />
          <Route exact path={"/add"} component={AddScenario} />
          <Route path="/scenarios/:id" component={Content} />
        </Switch>
      </div>
    </div>
  );
}

export default App;