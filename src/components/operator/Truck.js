import React, {useState} from "react";
import {connect} from "react-redux";
import {Header, Segment, Radio, Icon, Modal, Button, Form} from "semantic-ui-react";
import {updateTruck} from "../../actions";
import LocationFinder from "./LocationFinder";

const Truck = (props) => {
  const [isOnline, setIsOnline] = useState(() => {
    if(props.truck.departureTime < Date.now()) {
      return false
    } else {
      return true
    }
  });
  const [openOnlineModal, setOpenOnlineModal] = useState(false)
  const [formValues, setFormValues] = useState({
    departureTime: '',
    location: ''
  })

  const handleChangeOnline = () => {
    setIsOnline(!isOnline)
    if(!isOnline) {
      setOpenOnlineModal(true)
    } else {
      props.updateTruck(props.truck.id, {
        currentLocation: formValues.location,
        departureTime: Date.now()
      })
    }
  };

  const handlePlaceSelector = (placeData) => {
    setFormValues({
      ...formValues,
      location: placeData,
    });
  };

  const handleValuesChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    var dt = new Date();
    dt.setHours( dt.getHours() + parseInt(formValues.departureTime) );
    props.updateTruck(props.truck.id, {
      currentLocation: formValues.location,
      departureTime: Date.parse(dt)
    })
    setOpenOnlineModal(false)
  }
  
  return (
    <>
    <Modal
        onOpen={() => setIsOnline(true)}
        open={openOnlineModal}
        size="mini"
      >
        <Modal.Header>Go Online</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>Amount of Hours</label>
                <input
                  name="departureTime"
                  placeholder="ex. 2"
                  value={formValues.departureTime}
                  onChange={handleValuesChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Location</label>
                <LocationFinder handlePlaceSelector={handlePlaceSelector} />
              </Form.Field>
              <Button type="submit" color="green">
                <Icon name="world" /> Go Online
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
      <Segment
        vertical
        onClick={() => {
          props.setShowTruckById(props.truck.id);
        }}
        style={{cursor: "pointer", margin: "0 1rem"}}
      >
        <Header size="large">{props.truck.name}</Header>

        <p>
          <Icon name="map pin" size="large" color="red" />

          {props.truck.currentLocation !== undefined ? props.truck.departureTime > Date.now() ? `${props.truck.currentLocation.split(', ')[2]}, ${props.truck.currentLocation.split(', ')[3]}` : 'offline' : 'Offline'}
        </p>
        <div>
          <p>
            <Icon name="food" size="large" color="yellow" />

            {props.truck.cuisineType}
          </p>
          <Radio slider checked={isOnline} label="Online" onChange={handleChangeOnline} />
        </div>
      </Segment>
    </>
  );
};

export default connect(null,{updateTruck})(Truck);
