import React from "react";
import MenuItem from "./MenuItem";
import {Item} from "semantic-ui-react";

const MenuList = (props) => {
  return (
    <>
      <h2>Menu</h2>
      <div>
        <Item.Group divided>
          {props.truck.menu.map((menuItem) => (
            <MenuItem
              key={menuItem.id}
              menuItem={menuItem}
              truck={props.truck}
            />
          ))}
        </Item.Group>
      </div>
    </>
  );
};

export default MenuList;
