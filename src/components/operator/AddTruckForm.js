import React, {useState} from "react";
import {connect} from "react-redux";
import {addTruck, fetchOperatorData} from "../../actions";
import LocationFinder from "./LocationFinder";
import {Button, Modal, Icon, Form} from "semantic-ui-react";

const AddTruckForm = (props) => {
  const [open, setOpen] = useState(false);
  const [addTruck, setAddTruck] = useState({
    operatorId: props.operatorId,
    name: "",
    imageOfTruck: "",
    cuisineType: "",
    currentLocation: "",
  });

  const handleChange = (e) => {
    setAddTruck({
      ...addTruck,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceSelector = (placeData) => {
    setAddTruck({
      ...addTruck,
      currentLocation: placeData,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.addTruck(addTruck);

    setAddTruck({
      name: "",
      imageOfTruck: "",
      cuisineType: "",
      currentLocation: "",
    });

    setOpen(false);
  };

  return (
    <>
      <Modal
        onClose={() => {
          setOpen(false);
          setAddTruck({
            name: "",
            imageOfTruck: "",
            cuisineType: "",
            currentLocation: "",
          });
        }}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button
            color="orange"
            style={{marginTop: ".5rem", marginBottom: ".75rem"}}
          >
            <Icon name="add" />
            Add Food Truck
          </Button>
        }
      >
        <Modal.Header>Add Food Truck</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>Truck Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name of Truck"
                  value={addTruck.name}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Image URL</label>
                <input
                  type="text"
                  name="imageOfTruck"
                  placeholder="Enter Image URL"
                  value={addTruck.imageOfTruck}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Cuisine</label>
                <input
                  type="text"
                  name="cuisineType"
                  placeholder="ex. Vietnamese"
                  value={addTruck.cuisineType}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Location</label>
                <LocationFinder handlePlaceSelector={handlePlaceSelector} />
              </Form.Field>
              <Button type="submit">
                <Icon name="add" /> Add Truck
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default connect(null, {addTruck, fetchOperatorData})(AddTruckForm);
