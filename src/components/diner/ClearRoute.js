import React from 'react';
import { Segment, Button, Icon, Header } from 'semantic-ui-react';

const ClearRouteSegmentStyle = {
    position: 'absolute',
    zIndex: 1000,
    right: 10,
    bottom: 10,
    display: 'flex',
    alignItems: 'center',
}

function ClearRoute(props) {
    return ( 
        props.destination !== null ? (
            <Segment style={ClearRouteSegmentStyle}>
            <Icon name='location arrow' size='big' />
            <div>
                <Header as='h3' style={{marginLeft: 20, marginRight: 20}}>
                    Right now you are following a Route
                    <Header.Subheader>
                        Route from Current Location to {props.destination.truckName}
                    </Header.Subheader>
                </Header>
            </div>
            
            <Button floated='right' color="red" size="big" 
                onClick={() => { 
                    props.setDestination(null)
                    props.RecenterMap(props.myLocation)
                }}>Clear Route</Button>
        </Segment>
        ) : null
        
    )
}

export default ClearRoute