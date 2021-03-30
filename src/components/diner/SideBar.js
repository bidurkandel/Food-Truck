import React, {useState} from "react";
import {Segment} from "semantic-ui-react";
import TruckListSideBar from "./TruckListSideBar";
import TruckInfoSideBar from "./TruckInfoSideBar";

const SideBarStyle = {
  position: "absolute",
  top: 70,
  left: 10,
  width: 350,
  bottom: 10,
  zIndex: 100,
  display: "flex",
  flexDirection: "column",
};

function SideBar(props) {
  const [searchValue, setSearchValue] = useState("");
  const handleMilesRadiusChange = (e) => {
    props.setMilesRadius(e.target.value);
  };

  return (
    <Segment style={SideBarStyle}>
      {props.infoWindow.visible ? (
        <TruckInfoSideBar
          infoWindow={props.infoWindow}
          setInfoWindow={props.setInfoWindow}
          addFavoriteTruck={props.addFavoriteTruck}
          deleteFavoriteTruck={props.deleteFavoriteTruck}
          addTruckRating={props.addTruckRating}
          addMenuRating={props.addMenuRating}
          userInfo={props.userInfo}
        />
      ) : (
        <TruckListSideBar
          handleMilesRadiusChange={handleMilesRadiusChange}
          trucks={props.trucks}
          setDestination={props.setDestination}
          setInfoWindow={props.setInfoWindow}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          RecenterMap={props.RecenterMap}
          myLocation={props.myLocation}
          milesRadius={props.milesRadius}
        />
      )}
    </Segment>
  );
}

export default SideBar;
