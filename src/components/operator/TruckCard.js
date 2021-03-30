import React, {useState} from "react";
import {connect} from "react-redux";
import {fetchOperatorData, updateTruck, removeTruck} from "../../actions";
import LocationFinder from "./LocationFinder";
import {
  Card,
  Icon,
  Image,
  Header,
  Rating,
  Button,
  Modal,
  Form,
} from "semantic-ui-react";

const TruckCard = (props) => {
  const [open, setOpen] = useState(false);
  const [selectTruck, setSelectTruck] = useState({
    id: props.truck.id,
    operatorId: props.operatorId,
    name: props.truck.name,
    imageOfTruck: props.truck.imageOfTruck,
    cuisineType: props.truck.cuisineType,
    currentLocation: props.truck.currentLocation,
  });

  const handleDeleteTruck = () => {
    props.removeTruck(props.truck.id, selectTruck);
  };

  const handleChange = (e) => {
    setSelectTruck({
      ...selectTruck,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceSelector = (placeData) => {
    setSelectTruck({
      ...selectTruck,
      currentLocation: placeData,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.updateTruck(props.truck.id, selectTruck);

    setOpen(false);
  };

  return (
    <>
      <div>
        <Header size="large">
          {props.truck.name}
          <br />
          <Button.Group basic size="tiny">
            <Modal
              onClose={() => {
                setOpen(false);
                setSelectTruck({
                  name: selectTruck.name,
                  imageOfTruck: selectTruck.imageOfTruck,
                  cuisineType: selectTruck.cuisineType,
                  currentLocation: selectTruck.currentLocation,
                });
              }}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={
                <Button>
                  <Icon name="pencil" /> Edit
                </Button>
              }
            >
              <Modal.Header>Edit Food Truck</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Form onSubmit={handleSubmit}>
                    <Form.Field>
                      <label>Truck Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name of Truck"
                        value={selectTruck.name}
                        onChange={handleChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Image URL</label>
                      <input
                        type="text"
                        name="imageOfTruck"
                        placeholder="Enter Image URL"
                        value={selectTruck.imageOfTruck}
                        onChange={handleChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Cuisine</label>
                      <input
                        type="text"
                        name="cuisineType"
                        placeholder="ex. Vietnamese"
                        value={selectTruck.cuisineType}
                        onChange={handleChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Location</label>
                      <LocationFinder
                        handlePlaceSelector={handlePlaceSelector}
                      />
                    </Form.Field>
                    <Button type="submit">
                      <Icon name="add" /> Update Truck
                    </Button>
                  </Form>
                </Modal.Description>
              </Modal.Content>
            </Modal>
            <Button onClick={handleDeleteTruck}>
              <Icon name="delete" /> Delete
            </Button>
          </Button.Group>
        </Header>

        <Card>
          <Image
            src={props.truck.imageOfTruck}
            alt={`${props.truck.cuisineType} food truck`}
            size="medium"
          />
          <Card.Content>
            <Card.Header></Card.Header>

            <Card.Meta>
              <span className="date">
                <Icon name="clock" />
                {props.truck.departureTime}
              </span>
            </Card.Meta>
            <Card.Description>
              <Icon name="food" color="yellow" />
              {props.truck.cuisineType}
            </Card.Description>
            <Card.Description>
              <Icon name="map pin" color="red" />
              {props.truck.currentLocation}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            Average Rating:
            <br />
            <Rating
              maxRating={5}
              defaultRating={props.truck.customerRatingsAvg}
              icon="star"
              disabled
              size="huge"
              style={{marginTop: ".75rem"}}
            />
          </Card.Content>
        </Card>
      </div>
    </>
  );
};

export default connect(null, {fetchOperatorData, updateTruck, removeTruck})(
  TruckCard
);
