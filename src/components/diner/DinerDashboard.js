import React, {useState, useEffect} from "react";
import MapContainer from "./MapContainer";
import {connect} from "react-redux";
import SideBar from "./SideBar";
import {
  fetchTruckData,
  fetchDinerInfo,
  addFavoriteTruck,
  deleteFavoriteTruck,
  addTruckRating,
  addMenuRating,
} from "../../actions";
import ClearRoute from "./ClearRoute";
import Header from "../Header";

const DinerDashboard = (props) => {
  const [infoWindow, setInfoWindow] = useState({
    visible: false,
    position: {},
    currentTruck: {
      truckName: "The Big supersized ",
      imageOfTruck:
        "https://static.wixstatic.com/media/bb1bd6_485d9a16b9fb4bdf82a580021d224fea~mv2.png/v1/fill/w_1000,h_594,al_c,usm_0.66_1.00_0.01/bb1bd6_485d9a16b9fb4bdf82a580021d224fea~mv2.png",
      cuisineType: "Latin Cuisine",
      customerRatings: [3, 4, 2, 4],
      customerRatingAvg: 4,
      menu: [],
      currentLocation: "",
    },
  });

  const [destination, setDestination] = useState(null);
  const [milesRadius, setMilesRadius] = useState(1);
  const [mapCenter, setMapCenter] = useState({});
  const [myLocation, setMyLocation] = useState("");
  useEffect(() => {
    props.fetchTruckData();
    props.fetchDinerInfo(localStorage.getItem("dinerId"));
  }, []);

  useEffect(() => {
    if (infoWindow.visible) {
      let temp = props.trucks.filter((truck) => {
        return truck.id === infoWindow.currentTruck.id;
      });
      setInfoWindow({
        ...infoWindow,
        currentTruck: temp[0],
      });
      console.log(infoWindow);
    }
  }, [props.trucks]);

  const RecenterMap = (location) => {
    setMapCenter(location);
  };

  return (
    <>
      <Header />
      <ClearRoute
        destination={destination}
        setDestination={setDestination}
        RecenterMap={RecenterMap}
        myLocation={myLocation}
      />
      <SideBar
        infoWindow={infoWindow}
        setInfoWindow={setInfoWindow}
        destination={destination}
        setDestination={setDestination}
        trucks={props.trucks}
        userInfo={props.userInfo}
        milesRadius={milesRadius}
        setMilesRadius={setMilesRadius}
        RecenterMap={RecenterMap}
        myLocation={myLocation}
        addFavoriteTruck={props.addFavoriteTruck}
        deleteFavoriteTruck={props.deleteFavoriteTruck}
        addTruckRating={props.addTruckRating}
        addMenuRating={props.addMenuRating}
      />
      <MapContainer
        infoWindow={infoWindow}
        setInfoWindow={setInfoWindow}
        destination={destination}
        trucks={props.trucks}
        userInfo={props.userInfo}
        milesRadius={milesRadius}
        mapCenter={mapCenter}
        setMapCenter={setMapCenter}
        myLocation={myLocation}
        setMyLocation={setMyLocation}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.diner.userInfo,
    trucks: state.diner.trucks,
  };
};

export default connect(mapStateToProps, {
  fetchTruckData,
  fetchDinerInfo,
  addFavoriteTruck,
  deleteFavoriteTruck,
  addTruckRating,
  addMenuRating,
})(DinerDashboard);
