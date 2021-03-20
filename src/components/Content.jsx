import React, { Component } from 'react';
import ScenarioDataService from "../services/ScenarioService";
import ExplainCard from "./explainCard";
import DeckLayer from "./deckLayer";
import Detail from "./detail";
import AddScenario from "./AddScenario";

class Content extends Component {
  state = { 
    category_name: 'Category',
    location_name : 'Location',
    inbound: true,
    outbound: true,
    show: false,
    submitted: false,
    productFlows: [],
    locations: []
  }

  handleLocation = (e) => {
    //console.log(e.target.text);
    if (e.target.text === 'All'){
      this.setState({location_name : 'Location'});
    }
    else{
      this.setState({location_name : e.target.text});
    }
  }
  handleCategory = (e) => {
    //console.log(e.target.text);
    if (e.target.text !== this.category_name){
      this.setState({location_name : 'Location'});
    }
    if (e.target.text === 'All'){
      this.setState({category_name : 'Category'});
    }
    else{
      this.setState({category_name : e.target.text});
    }
  }
  handleInbound = (e) => {
    //console.log(e.target.text);
    this.setState({inbound : e.target.checked});
  }
  handleOutbound = (e) => {
    //console.log(e.target.checked);
    this.setState({outbound : e.target.checked});
  }
  handleDetails = () => {
    this.setState({show: !this.state.show});
    //console.log(this.state.show);
  }
  handleSubmit = () => {
    this.setState({submitted: !this.state.submitted});
    console.log(this.state.submitted);
  }

  dataRetrieval = (id) => {
    ScenarioDataService.locationsGet(id)
      .then(response => {
        this.setState({locations: response.data});
        //console.log(this.state.locations);
      })
      .catch(e => {
        console.log(e);
      });
    ScenarioDataService.productFlowsGet(id)
      .then(response => {
        this.setState({productFlows: response.data});
        //console.log(this.state.productFlows);
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() { 
    return ( 
      <div className = "container-fluid">
        <DeckLayer 
          productFlowData = {this.state.productFlows}
          locationData = {this.state.locations}
          locationName = {this.state.location_name}
          categoryName = {this.state.category_name} 
          inbound = {this.state.inbound}
          outbound = {this.state.outbound}
        />
        {this.state.submitted?(
        <ExplainCard categoryName = {this.state.category_name} 
          locationData = {this.state.locations}
          selectCategory = {this.handleCategory}
          locationName = {this.state.location_name} 
          selectLocation = {this.handleLocation}
          inbound = {this.state.inbound}
          outbound = {this.state.outbound}
          selectInbound = {this.handleInbound}
          selectOutbound = {this.handleOutbound}
          show = {this.state.show}
          selectShow = {this.handleDetails}
        />):
        (<AddScenario 
          selectSubmit = {this.handleSubmit}
          passScenarioid = {this.dataRetrieval}
        />)}
        {this.state.show && 
        <Detail
          categoryName = {this.state.category_name}
          locationName = {this.state.location_name} 
          productFlowData = {this.state.productFlows}
          inbound = {this.state.inbound}
          outbound = {this.state.outbound}/>}
      </div> 
     );
  }
}

export default Content;
