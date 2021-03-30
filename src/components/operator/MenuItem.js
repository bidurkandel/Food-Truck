import React, {useState} from "react";
import {connect} from "react-redux";
import {updateMenuItem, removeMenuItem, fetchOperatorData} from "../../actions";
import {Icon, Button, Item, Modal, Form, Grid} from "semantic-ui-react";

const MenuItem = (props) => {
  const [open, setOpen] = useState(false);
  const [selectItem, setSelectItem] = useState(props.menuItem);

  const handleChange = (e) => {
    setSelectItem({
      ...selectItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = () => {
    props.removeMenuItem(props.truck.id, selectItem.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {itemName, itemDescription, itemPrice} = selectItem;

    props.updateMenuItem(props.truck.id, selectItem.id, {
      itemName,
      itemDescription,
      itemPrice,
    });

    setOpen(false);

    props.fetchOperatorData(localStorage.getItem("operatorId"));
  };

  return (
    <>
      <Item>
        <Item.Content>
          <Item.Header as="h3">{props.menuItem.itemName}</Item.Header>
          <Item.Meta as="h4">
            <Icon name="dollar sign" /> {props.menuItem.itemPrice} .OO
          </Item.Meta>
          <Item.Description>{props.menuItem.itemDescription}</Item.Description>
          <Item.Extra>
            <Button.Group basic size="mini">
              <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={
                  <Button>
                    <Icon name="pencil" /> Edit
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
                          value={selectItem.itemName}
                          onChange={handleChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Description</label>
                        <input
                          name="itemDescription"
                          placeholder="Describe Menu Item"
                          value={selectItem.itemDescription}
                          onChange={handleChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Price</label>
                        <input
                          name="itemPrice"
                          type="number"
                          placeholder="0.00"
                          value={selectItem.itemPrice}
                          onChange={handleChange}
                        />
                      </Form.Field>
                      <Button type="submit">
                        <Icon name="add" /> Update Item
                      </Button>
                    </Form>
                  </Modal.Description>
                </Modal.Content>
              </Modal>

              <Button onClick={handleDelete}>
                <Icon name="delete" /> Delete
              </Button>
            </Button.Group>
          </Item.Extra>
        </Item.Content>
        <Grid columns="equal">
          <Grid.Row floated="right">
            {props.menuItem.itemPhotos.map((image) => (
              <Grid.Column key={image}>
                <Item.Image key={image} src={image} size="small" />
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </Item>
    </>
  );
};

export default connect(null, {
  updateMenuItem,
  removeMenuItem,
  fetchOperatorData,
})(MenuItem);
