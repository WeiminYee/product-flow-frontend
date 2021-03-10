import React, { Component } from 'react';
import LocationData from '../map_data/locations.json';
//import ProductFlowData from '../map_data/productflow.json';

class ExplainCard extends Component {
    /*state = { show : false };
    handleDetails=() => {
        this.setState({show: !this.state.show});
    }*/

    categories = [...new Set(LocationData.map(location =>location.Type))];

    render() { 
        return (
        /*<div className="float-left container overlap mt-3 col-sm-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Product Flow</h5>
                    <p className="card-text">From : </p>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.props.locationName}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{"maxHeight": "200px", "overflowY": "auto"}}>
                            {LocationData.map(location => <a key={location.Name} className="dropdown-item" onClick={this.props.selectLocation}>{location.Name}</a>)}
                        </div>
                    </div>
                    <button className="btn btn-secondary mt-3" type="button" onClick ={this.handleDetails}>
                        Hide Details
                    </button>
                    <div className='mt-3'  style={{"maxHeight": "300px", "overflowY": "auto"}}>
                        {ProductFlowData.filter(flow => flow.FromName === this.props.locationName).map(flow => <div className="card mt-1"><p className="card-text">{flow.From +' to '+ flow.To +' '+ flow.Flow +' '+ flow.Unit +' '+ flow.Product }</p></div>)}
                        {ProductFlowData.filter(flow => flow.ToName === this.props.locationName).map(flow => <div className="card mt-1"><p className="card-text">{flow.From +' to '+ flow.To +' '+ flow.Flow +' '+ flow.Unit +' '+ flow.Product }</p></div>)}
                    </div>
                </div>
            </div>
        </div>*/
        <div className="float-left container overlap mt-3 col-sm-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Product Flow</h5>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="categoryDropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.props.categoryName}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="categoryDropdownMenuButton" style={{"maxHeight": "200px", "overflowY": "auto"}}>
                            <a key='allCategory' className="dropdown-item" onClick={this.props.selectCategory}>All</a>
                            {this.categories.map(category => <a key={category} className="dropdown-item" onClick={this.props.selectCategory}>{category}</a>)}
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle mt-3" type="button" id="locationDropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.props.locationName}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="locationDropdownMenuButton" style={{"maxHeight": "200px", "overflowY": "auto"}}>
                            <a key='allLocation' className="dropdown-item" onClick={this.props.selectLocation}>All</a>
                            {LocationData.filter(location => location.Type === this.props.categoryName || this.props.categoryName === 'Category').map(location => <a key={location.Name} className="dropdown-item" onClick={this.props.selectLocation}>{location.Name}</a>)}
                        </div>
                    </div>
                    <div class="form-check mt-3">
                        <input class="form-check-input" type="checkbox" checked={this.props.inbound} onChange={this.props.selectInbound} id="inboundCheck"/>
                        <label class="form-check-label" htmlFor="inboundCheck">
                            inbound
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" checked={this.props.outbound} onChange={this.props.selectOutbound} id="outboundCheck"/>
                        <label class="form-check-label" htmlFor="outboundCheck">
                            outbound
                        </label>
                    </div>
                    {this.props.show?(
                    <button className="btn btn-secondary mt-3" type="button" onClick ={this.props.selectShow}>
                        Hide Details
                    </button>):
                    (
                    <button className="btn btn-secondary mt-3" type="button" onClick ={this.props.selectShow}>
                        Show Details
                    </button>
                    )}
                </div>
            </div>
        </div>
      );
    }
}
 
export default ExplainCard;