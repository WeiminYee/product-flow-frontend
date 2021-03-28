import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import ScenariosList from "./components/ScenariosList";
import AddScenario from "./components/AddScenario";
import ViewScenario from "./components/ViewScenario";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark" style={{'z-index':'1000', 'position':"relative"}}>
        <a href="/" className="navbar-brand">
          SCViz
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add Scenario
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/scenarios"} className="nav-link">
              Scenario List
            </Link>
          </li>
        </div>
      </nav>

      <div>
        <Switch>
          <Route exact path={["/", "/scenarios"]} component={ScenariosList} />
          <Route exact path={"/add"} component={AddScenario} />
          <Route path="/scenarios/:id" component={ViewScenario} />
        </Switch>
      </div>
    </div>
  );
}

export default App;