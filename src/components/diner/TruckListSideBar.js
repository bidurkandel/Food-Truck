import React from "react";
import {
  Segment,
  Input,
  Container,
  List,
  Image,
  Header,
  Button,
  Icon,
} from "semantic-ui-react";

const milesRadiusSegmentStyle = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  justifyContent: "space-between",
  borderLeft: "none",
  borderRight: "none",
  borderBottom: "none",
  boxShadow: "none",
  marginBottom: -10,
  paddingLeft: 5,
  paddingRight: 5,
};

const listImageStyle = {
  width: 60,
  height: 60,
};

function TruckListSideBar(props) {
  const handleOnSearch = (e) => {
    props.setSearchValue(e.target.value);
  };

  return (
    <>
      <Input
        placeholder="Search..."
        style={{width: "100%"}}
        onChange={handleOnSearch}
        value={props.searchValue}
      />
      <Container style={{overflow: "auto", flexGrow: "1", marginTop: 10}}>
        <List selection verticalAlign="middle" size="large">
          {props.trucks
            .filter((filtertruck) => {
              return (
                filtertruck.name.includes(props.searchValue) ||
                filtertruck.cuisineType.includes(props.searchValue)
              );
            })
            .map((t, index) => {
              let coordinates = t.currentLocation.split(", ");
              return (
                <List.Item
                  key={index}
                  onClick={(e) => {
                    if (t.departureTime > Date.now()) {
                      props.setInfoWindow({
                        visible: true,
                        position: {lat: coordinates[0], lng: coordinates[1]},
                        currentTruck: t,
                      });
                      props.RecenterMap({
                        lat: coordinates[0],
                        lng: coordinates[1],
                      });
                    }
                  }}
                >
                  <List.Content floated="right">
                    {t.departureTime > Date.now() ? (
                      <Button
                        icon
                        color="green"
                        onClick={(e) => {
                          e.stopPropagation();
                          props.setDestination({
                            location: {
                              lat: parseFloat(coordinates[0]),
                              lng: parseFloat(coordinates[1]),
                            },
                            truckName: t.truckName,
                          });
                        }}
                        size="small"
                      >
                        <Icon name="location arrow" />
                      </Button>
                    ) : null}
                  </List.Content>
                  <Image src={t.imageOfTruck} style={listImageStyle} />
                  <List.Content>
                    <List.Header>{t.name}</List.Header>
                    <Header as="h5" disabled>
                      {t.cuisineType}
                    </Header>
                    <Header as="h5" disabled>
                      {t.departureTime > Date.now() ? `${coordinates[2]}, ${coordinates[3]}` : 'offline'}
                    </Header>
                  </List.Content>
                </List.Item>
              );
            })}
        </List>
      </Container>
      <Segment style={milesRadiusSegmentStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Header as="h5" style={{margin: 0}}>
            Search Radius: {props.milesRadius} Miles
          </Header>
          <input
            type="range"
            min="1"
            max="10"
            onChange={props.handleMilesRadiusChange}
            value={props.milesRadius}
          />
        </div>

        <Button
          onClick={() => {
            props.RecenterMap(props.myLocation);
          }}
          primary
        >
          Go to My Location
        </Button>
      </Segment>
    </>
  );
}

export default TruckListSideBar;
