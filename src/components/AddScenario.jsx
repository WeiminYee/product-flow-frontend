import React, { useState } from "react";
import ScenarioDataService from "../services/ScenarioService";
import { DataFrame } from 'pandas-js';
import { Map } from 'immutable';
import * as XLSX from 'xlsx';

const AddScenario = (props) => {
  const initialScenarioState = {
    scenario_id: null,
    scenario_name: "",
  };
  const [scenario, setScenario] = useState(initialScenarioState);
  const [submitted, setSubmitted] = useState(false);
  const [selectedLocationFile, setSelectedLocationFile] = useState();
  let locationFileReader;
  const [selectedProductFlowFile, setSelectedProductFlowFile] = useState();
  let productflowFileReader; 
  let scenario_id = '';

  const handleInputChange = event => {
    const { name, value } = event.target;
    setScenario({ ...scenario, [name]: value });
  };

  const handleLocationChange = (event) => {
		setSelectedLocationFile(event.target.files[0]);
	}

    const handleProductFlowChange = (event) => {
		setSelectedProductFlowFile(event.target.files[0]);
	}

  const saveScenario = () => {
    var data = {
      scenario_name: scenario.scenario_name
    };

    ScenarioDataService.scenariosCreate(data)
      .then(response => {
        setScenario({
          scenario_id: response.data.scenario_id,
          scenario_name: response.data.scenario_name
        });
        scenario_id = response.data.scenario_id;
        //handleFileSubmission();
        //setSubmitted(true);
        //console.log(response.data);
      })
      .then(response => {
        //console.log(scenario_id);
        handleFileSubmission();
        setSubmitted(true);
        props.selectSubmit();        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleFileSubmission = () => {
    locationFileReader = new FileReader();
    locationFileReader.onload = handleLocationFileRead;
    locationFileReader.readAsBinaryString(selectedLocationFile);
    productflowFileReader = new FileReader();
    productflowFileReader.onload = handleProductFlowFileRead;
    productflowFileReader.readAsBinaryString(selectedProductFlowFile);
  };

  const handleLocationFileRead = (e) => {
		/*read Customers, DCs, Factories, Suppliers and Locations*/
		const bstr  = locationFileReader.result;
		const wb = XLSX.read(bstr, {type:'binary'});
		const customers = XLSX.utils.sheet_to_json(wb.Sheets['Customers']); // https://docs.sheetjs.com/
		const factories = XLSX.utils.sheet_to_json(wb.Sheets['DCs and Factories']);
		const suppliers = XLSX.utils.sheet_to_json(wb.Sheets['Suppliers']);
		const locations = XLSX.utils.sheet_to_json(wb.Sheets['Locations']);

		/*convert to dataframe*/
		const customers_df = new DataFrame(customers).get(['Name','Type','Location']); //https://stratodem.github.io/pandas.js-docs/#code-concat-code
		const factories_df = new DataFrame(factories).get(['Name','Type','Location']);
		const suppliers_df = new DataFrame(suppliers).get(['Name','Type','Location']);
		const locations_df = new DataFrame(locations).get(['Name','Latitude','Longitude']);
		//console.log(customers_df.toString());

		/*combine*/
		const all_df = customers_df.append(factories_df, true).append(suppliers_df, true); //true to reindex
		const locations_renamed_df = locations_df.rename({columns: Map({"Name": "Location"})});
		const df_with_loc = all_df.merge(locations_renamed_df, ['Location'], 'inner');
		const final_locations = df_with_loc.get(['Name', 'Type', 'Latitude', 'Longitude']);
		const final_locations_renamed_df = final_locations.rename({columns: Map({"Name": "location_name", 'Type': 'location_type', 'Latitude': 'location_latitude', 'Longitude': 'location_longitude'})});
		const locations_json = final_locations_renamed_df.to_json({orient: 'records'});
    //const locations_json_with_scenarioid = locations_json.map(loc => ({...loc, 'scenario_id' : scenario_id}));
    //put data into database;
		//console.log(scenario_id);
    //console.log(locations_json);
    ScenarioDataService.createMultipleLocationsByScenarioId(scenario_id, locations_json)
      .then(response => {
        console.log(response.data.message);
      })
      .catch(e => {
        console.log(e);
      });
    };

    const handleProductFlowFileRead = (e) => {
      /*read product flow*/
      const bstr  = productflowFileReader.result;
      const wb = XLSX.read(bstr, {type:'binary'});
      const sheetName = wb.SheetNames[0];
      const workSheet = wb.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(workSheet, {range:4});  //https://github.com/SheetJS/sheetjs/issues/482
      //console.log(data); 
      
      /*convert to dataframe*/ 
      const productflow_df = new DataFrame(data).get(['From', 'To', 'Product', 'Flow', 'Unit', 'Distance']); //https://stratodem.github.io/pandas.js-docs/#code-concat-code
      const productflow_renamed_df = productflow_df.rename({columns: Map({'From': 'from_location', 'To': 'to_location', "Product": 'product', 'Flow': 'quantity', 'Unit': 'unit', 'Distance': 'distance'})});
      //console.log(df_with_loc.toString());
      const productflow_json = productflow_renamed_df.to_json({orient: 'records'});
      //const productflow_json_with_scenarioid = productflow_json.map(prodf => ({...prodf, 'scenario_id' : scenario_id}));
      //console.log(scenario_id);
      //console.log(productflow_json);
      ScenarioDataService.createMultipleProductFlowByScenarioId(scenario_id, productflow_json)
        .then(response => {
          console.log(response.data.message);
          props.passScenarioid(scenario_id);
        })
        .catch(e => {
          console.log(e);
        });
      };



  // const newScenario = () => {
  //   setScenario(initialScenarioState);
  //   setSubmitted(false);
  // };

  return (
    <div className="float-left container overlap mt-3 col-lg-3">
      <div className="card">
        <div className="card-body">
          <div className="submit-form">
            {submitted ? (
              <div>
                <h4>You submitted successfully!</h4>
                {/* <button className="btn btn-success" onClick={newScenario}>
                  Add
                </button> */}
              </div>
            ) : (
              <div>
                <h5 className="card-title">Upload a scenario</h5>
                <div className="form-group">
                  <label htmlFor="scenario_name">Scenario Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="scenario_name"
                    required
                    value={scenario.scenario_name}
                    onChange={handleInputChange}
                    name="scenario_name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="scenarioFile">Excel file for Scenario</label>
                  <input 
                    type="file" 
                    className="form-control-file" 
                    id="scenarioFile"
                    required
                    onChange={handleLocationChange}
                    name="location"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="productFlowFile">Excel file for Product Flow</label>
                  <input 
                    type="file" 
                    className="form-control-file" 
                    id="productFlowFile"
                    required
                    onChange={handleProductFlowChange}
                    name="product_flow"
                  />
                </div>
                <button onClick={saveScenario} className="btn btn-success">
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddScenario;
