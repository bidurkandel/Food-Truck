import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {fetchOperatorData} from "../../actions";
import Header from "../../components/Header";
import TruckList from "./TruckList";
import FoodTruck from "./FoodTruck";

import {
  Container,
  Grid,
  Segment,
  Image,
  Message,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import FoodTruckImg from "../../images/undraw_street_food_hm5i.jpg";

const OperatorDashboard = ({
  isFetching,
  operatorInfo,
  fetchOperatorData,
  isOnline,
}) => {
  const [showTruckById, setShowTruckById] = useState(null);

  useEffect(() => {
    fetchOperatorData(localStorage.getItem("operatorId"));
  }, []);

  return (
    <>
      <Header />
      <Container fluid style={{padding: "2rem", marginTop: 60}}>
        {isFetching ? (
          <div>
            <Dimmer active inverted size="medium">
              <Loader inverted>Loading</Loader>
            </Dimmer>

            <Image src="/images/wireframe/short-paragraph.png" />
          </div>
        ) : (
          <Grid columns={2}>
            <Grid.Column computer={4} tablet={6} mobile={16}>
              <Segment raised>
                <TruckList
                  operatorId={operatorInfo.operatorId}
                  showTruckById={showTruckById}
                  setShowTruckById={setShowTruckById}
                  trucks={operatorInfo.trucksOwned}
                  isOnline={isOnline}
                />
              </Segment>
            </Grid.Column>

            <Grid.Column computer={12} tablet={10} mobile={16}>
              {showTruckById === null ? (
                <Segment basic>
                  {operatorInfo.trucksOwned.length === 0 ? (
                    <Message
                      floating
                      content="Add a food truck to get started"
                      info
                      size="large"
                    />
                  ) : (
                    <Message
                      floating
                      content="Click on then food truck name to show more details"
                      info
                      size="large"
                    />
                  )}

                  <Image
                    src={FoodTruckImg}
                    size="huge"
                    centered
                    style={{opacity: 0.4}}
                  />
                </Segment>
              ) : (
                <FoodTruck
                  operatorId={operatorInfo.operatorId}
                  showTruckById={showTruckById}
                  trucks={operatorInfo.trucksOwned}
                />
              )}
            </Grid.Column>
          </Grid>
        )}
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  console.log(state.operator.operatorInfo);
  return {
    operatorInfo: state.operator.operatorInfo,
    isFetching: state.operator.isFetching,
    isOnline: state.operator.isOnline,
  };
};

export default connect(mapStateToProps, {
  fetchOperatorData,
})(OperatorDashboard);
