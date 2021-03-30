import React, {useState} from "react";
import {connect} from "react-redux";
import {addMenuItem} from "../../actions";
import {Button, Modal, Icon, Form} from "semantic-ui-react";

const AddMenuForm = (props) => {
  const [open, setOpen] = useState(false);
  const [menuItem, setMenuItem] = useState({
    itemName: "",
    itemDescription: "",
    itemPrice: "",
    itemPhotos: "",
  });

  const handleChange = (e) => {
    setMenuItem({
      ...menuItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemPhotoArr = menuItem.itemPhotos.split(" ");
    props.addMenuItem(props.truck.id, {
      ...menuItem,
      itemPhotos: itemPhotoArr,
    });

    setMenuItem({
      itemName: "",
      itemDescription: "",
      itemPrice: "",
      itemPhotos: "",
    });

    setOpen(false);
  };

  return (
    <>
      <Modal
        onClose={() => {
          setOpen(false);
          setMenuItem({
            itemName: "",
            itemDescription: "",
            itemPrice: "",
            itemPhotos: "",
          });
        }}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button>
            <Icon name="add" />
            Add Menu Item
          </Button>
        }
      >
        <Modal.Header>Add Menu Item</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>Name</label>
                <input
                  name="itemName"
                  placeholder="ex. French Fries"
                  value={menuItem.itemName}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <input
                  name="itemDescription"
                  placeholder="Describe Menu Item"
                  value={menuItem.itemDescription}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Price</label>
                <input
                  name="itemPrice"
                  type="number"
                  placeholder="$0"
                  value={menuItem.itemPrice}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Item Photos</label>
                <input
                  name="itemPhotos"
                  placeholder="Enter Image URL's"
                  value={menuItem.itemPhotos}
                  onChange={handleChange}
                />
              </Form.Field>
              <Button type="submit">
                <Icon name="add" /> Add Item
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default connect(null, {addMenuItem})(AddMenuForm);
