import React from "react";
import {Segment} from "semantic-ui-react";

import AddTruckForm from "./AddTruckForm";
import Truck from "./Truck";

const TruckList = (props) => {
  return (
    <>
      <Segment vertical textAlign="center">
        <AddTruckForm operatorId={props.operatorId} />
      </Segment>
      {props.trucks === undefined ? null : props.trucks.length === 0 ? null : <h3>Food Trucks</h3>}

      {props.trucks === undefined ? null : props.trucks.map((truck) => (
        <div key={truck.id}>
          {console.log("SR : truck object", truck.id)}
          <Truck
            setShowTruckById={props.setShowTruckById}
            truck={truck}
            isOnline={props.isOnline}
          />
        </div>
      ))}
    </>
  );
};

export default TruckList;
