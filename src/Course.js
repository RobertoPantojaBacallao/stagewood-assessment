import React from 'react';
const Event = (props) => (
    <div className="card" style={{'width': '100%', 'marginTop': '10px'}}>
        <div className="card-body">
        <h5 className="card-title">{props.data.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">by {props.id}</h6>
        </div>
    // </div>
);
export default Event;