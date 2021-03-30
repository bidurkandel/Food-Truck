import React from 'react';
import { Segment, Image, Button, Icon } from 'semantic-ui-react';
 
import logo from '../../images/foodTruckTrackR.png'

const NavBarStyle = {
    position: "fixed",
    zIndex: 1000,
    left: 0,
    right: 0,
    padding: 0,
    borderRadius: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}

const NavBarButtonStyle = {
    marginRight: 20,
}

function DinerNavBar(props) {
    return (
        <Segment style={NavBarStyle} inverted>
            <Image src={logo} alt="Food Truck logo" style={{height: 70, marginLeft: 20}}/>
            <div>
                <Button icon size='huge' color='red' style={NavBarButtonStyle}>
                    <Icon name='cog' />
                </Button>
                <Button icon size='huge' color='red' style={NavBarButtonStyle}>
                    <Icon name='sign-out alternate' />
                </Button>
            </div>
        </Segment>
    )
}

export default DinerNavBar