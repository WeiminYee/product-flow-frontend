import React, { Component } from 'react';
import ExplainCard from "./components/explainCard";
import DeckLayer from "./components/deckLayer";
import Detail from "./components/detail";
import AddScenario from "./components/AddScenario";

class App extends Component {
  state = { 
    category_name: 'Category',
    location_name : 'Location',
    inbound: true,
    outbound: true,
    show: false,
    submitted: false
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

  render() { 
    return ( 
      <div className = "container-fluid">
        <DeckLayer 
          locationName = {this.state.location_name}
          categoryName = {this.state.category_name} 
          inbound = {this.state.inbound}
          outbound = {this.state.outbound}
        />
        {this.state.submitted?(
        <ExplainCard categoryName = {this.state.category_name} 
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
        />)}
        {this.state.show && 
        <Detail locationName = {this.state.location_name} 
          inbound = {this.state.inbound}
          outbound = {this.state.outbound}/>}
      </div> 
     );
  }
}

export default App;
