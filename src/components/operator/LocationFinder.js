import React from "react";
import Autocomplete from "react-google-autocomplete";

function LocationFinder(props) {
  return (
    <Autocomplete
      apiKey={"AIzaSyAKgYAy4mmkRtFlnYenEWKjuZPZ2c-JbMs"}
      onPlaceSelected={(place) => {
        props.handlePlaceSelector(
          `${place.geometry.location.lat()}, ${place.geometry.location.lng()}, ${
            place.address_components[2].long_name
          }, ${place.address_components[4].short_name}`
        );
        console.log(place);
      }}
      types={["address"]}
    />
  );
}

export default LocationFinder;
