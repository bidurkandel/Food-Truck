import React from 'react';
import { List, Image, Header, Rating, Segment, Button, Icon, Divider} from 'semantic-ui-react';

const menuHeaderStyle = {
    marginTop: "10px",
    marginBottom: "0px"
}
 const topSegmentsStyle = {
     boxShadow: 'none',
     borderRight: 'none',
     borderTop: 'none',
     borderLeft: 'none',
     margin: 0,
     padding: 5,
     display: 'flex',
     justifyContent: 'space-between',
 }


function TruckInfoSideBar(props) {
    return (
        <>
        <Segment style={topSegmentsStyle}>
            <Button icon onClick={() => {
                props.setInfoWindow({
                    ...props.infoWindow,
                    visible: false
                })
            }}>
                <Icon name='arrow left' />
            </Button>

            {props.userInfo.favoriteTrucks === undefined ? null : 
                props.userInfo.favoriteTrucks.filter(truck => {
                    return truck.truckId === props.infoWindow.currentTruck.id
                }).length === 0 ? <Button basic color='red' icon onClick={() => {
                    props.addFavoriteTruck(props.userInfo.dinerId,props.infoWindow.currentTruck.id)
                }}>
                    <Icon name='heart outline' />
                </Button> :
                <Button color='red' icon onClick={() => {
                    console.log(props.userInfo.dinerId,props.infoWindow.currentTruck.id);
                    props.deleteFavoriteTruck(props.userInfo.dinerId,props.infoWindow.currentTruck.id)
                }}>
                    <Icon name='heart' />
                </Button>
            }
        </Segment>
        <Header as='h2' textAlign='center' style={{}}>
            <Header.Content>
                {props.infoWindow.currentTruck.name}
                <Header.Subheader>
                    Cuisine: {props.infoWindow.currentTruck.cuisineType}
                </Header.Subheader>
            </Header.Content>
        </Header>
        <Rating icon='star' defaultRating={0} maxRating={5}  size='huge' style={{width: 190, margin: '0 auto'}} 
            onRate={(e, data) => {
                props.addTruckRating(props.infoWindow.currentTruck.id, props.userInfo.dinerId, data.rating)
            }}
        />
        <Divider clearing />
        <Header as='h3'  textAlign='center' style={menuHeaderStyle}>
            <Header.Content>Menu</Header.Content>
        </Header>
        <div style={{overflow: 'auto', maxHeight: 350, paddingRight: 10, flexGrow: 1}}>
            <List divided verticalAlign='middle' size="large">
                {
                props.infoWindow.currentTruck.menu.map((menu, index) => (
                    <List.Item key={index} style={{ paddingTop: 15}}>
                        <Image src={menu.itemPhotos[0]} style={{width: 50, height: 50}}/>
                        <List.Content style={{width: 250}}>
                            <List.Header style={{position: 'relative'}}>
                                {menu.itemName}
                                <span style={{position: "absolute", right: 0}}>${menu.itemPrice}.00</span>
                            </List.Header>
                            <List.Description>
                                {menu.itemDescription}
                            </List.Description>
                        </List.Content>
                        <List.Content floated="left" style={{paddingTop: 5, display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center',}}>
                            <Rating rating={menu.customerRatingsAvg} maxRating={5} disabled/>
                            <div style={{display: 'flex', alignItems: 'center', fontSize: '.9em'}}>
                                Rate it: 
                                <Rating defaultRating={menu.customerRatingsAvg} maxRating={5}
                                    onRate={(e,data)=> {
                                        props.addMenuRating(props.infoWindow.currentTruck.id, menu.id, props.userInfo.dinerId, data.rating)
                                    }}
                                />
                            </div>
                        </List.Content>
                    </List.Item>
                        
                ))
                } 
            </List>
        </div>
        </>
    )
}

export default TruckInfoSideBar