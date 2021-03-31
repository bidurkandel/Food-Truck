import React from "react";
import {BrowserRouter as Router, Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {Menu, Icon} from "semantic-ui-react";

const Header = () => {
  const {push} = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    push("/");
  };

  return (
    <Router>
      <Menu
        inverted
        size="massive"
        style={{
          borderRadius: 0,
          position: "fixed",
          top: "-1rem",
          left: 0,
          right: 0,
          height: "auto",
          zIndex: 1000,
        }}
      >
        <Menu.Item header>FoodTruck</Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <Link
              to={{
                pathname:
                  "",
              }}
              target="_blank"
            >
              Marketing Page
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Icon name="setting" />
          </Menu.Item>
          <Menu.Item>
            <Icon
              name="log out"
              onClick={handleLogout}
              style={{cursor: "pointer"}}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Router>
  );
};

export default Header;
