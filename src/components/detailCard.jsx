//import ProductFlowData from '../map_data/productflow.json';

function DetailCard(props) {
    const inboundCard = props.productFlowData.filter(flow => flow.ToName === props.locationName||props.locationName === 'Location').map(flow => <div className="card mt-1"><p className="card-text">{flow.FromName +' to '+ flow.ToName +' '+ flow.Flow +' '+ flow.Unit +' '+ flow.Product }</p></div>)
    const outboundCard = props.productFlowData.filter(flow => flow.FromName === props.locationName||props.locationName === 'Location').map(flow => <div className="card mt-1"><p className="card-text">{flow.FromName +' to '+ flow.ToName +' '+ flow.Flow +' '+ flow.Unit +' '+ flow.Product }</p></div>)
    return (
        <div className="float-right container overlap mt-3 col-lg-9">
            <div className="card">
                {props.locationName === 'Location'? (
                <div className="card-body">
                    <h5 className="card-title">Product Flow of All {props.categoryName}</h5>
                        <div className='mt-3'  style={{"maxHeight": "300px", "overflowY": "auto"}}>
                            {inboundCard}
                        </div>
                </div>
                ):(
                <div className="card-body">
                    <h5 className="card-title">Product Flow of {props.categoryName} - {props.locationName}</h5>
                    <h6>Inbound</h6>
                    <div className='mt-3'  style={{"maxHeight": "300px", "overflowY": "auto"}}>
                        {inboundCard.length > 0 ? (inboundCard):(<p>-- No Flow --</p>)}
                    </div>
                    <h6 className='mt-3'>Outbound</h6>
                    <div className='mt-3'  style={{"maxHeight": "300px", "overflowY": "auto"}}>
                        {outboundCard.length > 0 ? (outboundCard):(<p>-- No Flow --</p>)}
                    </div>
                </div>)}
            </div>
        </div>);
}
 
export default DetailCard;