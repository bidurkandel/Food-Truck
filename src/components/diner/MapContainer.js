import React, {useState, useEffect, useRef} from "react";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
  Circle,
} from "google-maps-react";
import {mapStyles} from "../../utils/mapStyles";

import {Card, Icon, Image, Grid} from "semantic-ui-react";

const mapStyle = {
  width: "100%",
  height: "100%",
  marginTop: "-1rem",
};

function MapContainer(props) {
  const circleRef = useRef();
  const [directionsRenderer] = useState(
    new props.google.maps.DirectionsRenderer({
      suppressMarkers: true,
    })
  );
  const [directionsService] = useState(
    new props.google.maps.DirectionsService()
  );
  const [mapReference, setMapReference] = useState(null);

  const [mapCenterHasBeingSet, setMapCenterHasBeingSet] = useState(false);

  const handleClickMarker = (propsMarker) => {
    props.setInfoWindow({
      visible: true,
      position: propsMarker.position,
      currentTruck: propsMarker.data_truck,
    });
  };

  const handleInfoWindowClose = () => {
    props.setInfoWindow({
      ...props.infoWindow,
      visible: false,
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        function (position) {
          props.setMyLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          console.log(position);
          if (props.myLocation !== "" && !mapCenterHasBeingSet) {
            props.setMapCenter(props.myLocation);
            setMapCenterHasBeingSet(true);
          }
        },
        function () {
          console.log("error position");
        }
      );
    }
  });

  useEffect(() => {
    if (props.destination !== null) {
      const request = {
        origin: props.myLocation,
        destination: props.destination.location,
        travelMode: "DRIVING",
      };
      console.log(request);

      directionsService.route(request, function (result, status) {
        if (status === "OK") {
          directionsRenderer.setDirections(result);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      });
    } else {
      directionsRenderer.setDirections({routes: []});
    }
  }, [props.destination]);

  const setDirectionsRenderer = (mapProps, map) => {
    setMapReference(map);
    directionsRenderer.setMap(map);
  };

  return (
    <Map
      google={props.google}
      disableDefaultUI={true}
      zoom={14}
      style={mapStyle}
      styles={mapStyles}
      center={props.mapCenter}
      onReady={setDirectionsRenderer}
    >
      <Marker
        position={props.myLocation}
        icon={{
          path: props.google.maps.SymbolPath.CIRCLE,
          scale: 8, //tamaño
          strokeColor: "#00f", //color del borde
          strokeWeight: 1, //grosor del borde
          fillColor: "#00f", //color de relleno
          fillOpacity: 0.7, // opacidad del relleno
        }}
      />
      <Circle
        ref={circleRef}
        radius={1609.34 * props.milesRadius}
        center={props.myLocation}
        strokeColor="#00f"
        strokeOpacity={1}
        strokeWeight={1}
        fillColor="#00f"
        fillOpacity={0.2}
      />
      {props.trucks.map((t, index) => {
        let coordinates = t.currentLocation.split(", ");
        if (t.departureTime > Date.now()) {
          return (
            <Marker
              key={index}
              name={"current Location"}
              position={{lat: coordinates[0], lng: coordinates[1]}}
              data_truck={t}
              onClick={handleClickMarker}
            />
          );
        }
      })}

      <InfoWindow
        visible={props.infoWindow.visible}
        position={props.infoWindow.position}
        style={{top: -60}}
        onClose={handleInfoWindowClose}
      >
        <Grid columns={1}>
          <Grid.Column>
            <Card>
              <Image
                src={props.infoWindow.currentTruck.imageOfTruck}
                alt={`${props.infoWindow.currentTruck.cuisineType} food truck`}
                style={{width: 290, height: 277}}
              />
              <Card.Content>
                <Card.Header>{props.infoWindow.currentTruck.name}</Card.Header>
                <Card.Meta>
                  Cuisine: {props.infoWindow.currentTruck.cuisineType}
                </Card.Meta>
                <Card.Description>
                  In Location Until:{" "}
                  {new Date(
                    props.infoWindow.currentTruck.departureTime
                  ).toLocaleTimeString()}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Icon name="star" />
                Average Rating:{" "}
                {`${props.infoWindow.currentTruck.customerRatingsAvg} (${props.infoWindow.currentTruck.customerRatings.length})`}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </InfoWindow>
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAKgYAy4mmkRtFlnYenEWKjuZPZ2c-JbMs",
})(MapContainer);
