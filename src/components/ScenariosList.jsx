import React, { useState, useEffect } from "react";
import ScenarioDataService from "../services/ScenarioService";
import { Link } from "react-router-dom";

const ScenariosList = () => {
  const [scenarios, setScenarios] = useState([]);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveScenarios();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveScenarios = () => {
    ScenarioDataService.scenariosGetAll()
      .then(response => {
        setScenarios(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveScenarios();
    setCurrentScenario(null);
  };

  const removeAllScenarios = () => {
    ScenarioDataService.scenariosRemoveAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeScenario = (id) => {
    ScenarioDataService.scenariosRemove(id)
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    ScenarioDataService.scenariosFindByTitle(searchTitle)
      .then(response => {
        setScenarios(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className='container mt-3'>
    <div className="list row">
      <div className="col-md-9">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-9">
        <h4>Scenarios List</h4>

        <ul className="list-group">
          {scenarios &&
            scenarios.map((scenario, index) => (
              <card
                className={
                  "list-group-item "
                }
                key={index}
              >
                {scenario.scenario_name}
                <div className='float-right'>
                  {/* <button className='ml-3 btn btn-outline-success'> view on map </button> */}
                  <Link
                    to={"/scenarios/" + scenario.scenario_id}
                    className="ml-3 btn btn-outline-success"
                  >
                    View On Map
                  </Link>
                  <button className='ml-3 btn btn-outline-danger' onClick={() => removeScenario(scenario.scenario_id)}> delete </button>
                </div>
              </card>
            ))}
        </ul>
      </div>
      <div className="col-md-3">
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllScenarios}
        >
          Remove All Scenarios
        </button>
        {/* <Link
          to={"/scenarios/" + currentScenario.id}
          className="badge badge-warning"
        >
          Edit
        </Link> */}
      </div>
    </div>
    </div>
  );
};

export default ScenariosList;
