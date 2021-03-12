import React from 'react';
import '../icon/icon_mapping.css';
//import LocationData from '../map_data/locations.json';
 
function ExplainCard (props)  {
    /*state = { show : false };
    handleDetails=() => {
         setState({show: ! state.show});
    }*/

    const categories = [...new Set(props.locationData.map(location =>location.Type))];
    
 
    return (
        <div className="float-left container overlap mt-3 col-lg-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Product Flow</h5>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="categoryDropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {props.categoryName}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="categoryDropdownMenuButton" style={{"maxHeight": "200px", "overflowY": "auto"}}>
                            <a key='allCategory' className="dropdown-item" onClick={props.selectCategory}>All</a>
                            {categories.map(category => <a key={category} className="dropdown-item" onClick={ props.selectCategory}>{category}</a>)}
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle mt-3" type="button" id="locationDropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {props.locationName}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="locationDropdownMenuButton" style={{"maxHeight": "200px", "overflowY": "auto"}}>
                            <a key='allLocation' className="dropdown-item" onClick={props.selectLocation}>All</a>
                            {props.locationData.filter(location => location.Type ===  props.categoryName ||  props.categoryName === 'Category').map(location => <a key={location.Name} className="dropdown-item" onClick={ props.selectLocation}>{location.Name}</a>)}
                        </div>
                    </div>
                    <div className="form-check mt-3">
                        <input className="form-check-input" type="checkbox" checked={props.inbound} onChange={props.selectInbound} id="inboundCheck"/>
                        <label className="form-check-label" htmlFor="inboundCheck">
                            inbound
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" checked={props.outbound} onChange={props.selectOutbound} id="outboundCheck"/>
                        <label className="form-check-label" htmlFor="outboundCheck">
                            outbound
                        </label>
                    </div>
                    { props.show?(
                    <button className="btn btn-secondary mt-3" type="button" onClick ={props.selectShow}>
                        Hide Details
                    </button>):
                    (
                    <button className="btn btn-secondary mt-3" type="button" onClick ={props.selectShow}>
                        Show Details
                    </button>
                    )}
                    {/* <hr></hr>
                    <h5 className="card-title">Legend</h5>
                    <div className="row ml-1">
                        <div id='Customer'></div> 
                        <p className="ml-3">Customer</p>
                    </div>
                    <div className="row ml-1">
                        <div id='Supplier'></div> 
                        <p className="ml-3">Suplier</p>
                    </div>
                    <div className="row ml-1">
                        <div id='DC'></div> 
                        <p className="ml-3">DC</p>
                    </div>
                    <div className="row ml-1">
                        <div id='Factory'></div> 
                        <p className="ml-3">Factory</p>
                    </div> */}
                </div>
            </div>
            <div className="card mt-3">
                <div className="card-body">
                    <h5 className="card-title">Legend</h5>
                    <div className="row ml-1">
                        <div id='Customer'></div> 
                        <p className="ml-3">Customer</p>
                    </div>
                    <div className="row ml-1">
                        <div id='Supplier'></div> 
                        <p className="ml-3">Suplier</p>
                    </div>
                    <div className="row ml-1">
                        <div id='DC'></div> 
                        <p className="ml-3">DC</p>
                    </div>
                    <div className="row ml-1">
                        <div id='Factory'></div> 
                        <p className="ml-3">Factory</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ExplainCard;