import React, {useState, useEffect} from "react";
import {Container, Grid, Segment} from "semantic-ui-react";
import AddMenuForm from "./AddMenuForm";
import MenuList from "./MenuList";
import TruckCard from "./TruckCard";

import Chart from "react-apexcharts";

//Operator should be able to edit, delete, add menu items, see ratings
const FoodTruck = (props) => {
  const [chart, setChart] = useState({
    options: {
      labels: ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"],
    },
    series: [5, 6, 7, 5, 4],
  });

  useEffect(() => {
    let newRatings = [0, 0, 0, 0, 0];
    props.trucks
      .filter((t) => {
        return t.id === props.showTruckById;
      })
      .forEach((item) => {
        item.customerRatings.forEach((rating) => {
          newRatings[newRatings.length - rating] += 1;
        });
      });
    setChart({
      ...chart,
      series: newRatings,
    });
  }, [props.showTruckById]);

  return (
    <Container>
      {props.trucks === undefined
        ? null
        : props.trucks
            .filter((t) => {
              return t.id === props.showTruckById;
            })
            .map((truck) => (
              <Grid key={truck.id}>
                <Grid.Row>
                  <Grid.Column computer={6} tablet={16}>
                    <TruckCard truck={truck} operatorId={props.operatorId} />
                  </Grid.Column>
                  <Grid.Column computer={10} tablet={16}>
                    <Grid columns="equal">
                      <Grid.Column>
                        <Chart
                          type="donut"
                          options={chart.options}
                          series={chart.series}
                          width={500}
                        />
                      </Grid.Column>
                    </Grid>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column>
                    <Segment vertical textAlign="right">
                      <AddMenuForm truck={truck} />
                    </Segment>

                    <Segment vertical>
                      <MenuList truck={truck} />
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            ))}
    </Container>
  );
};

export default FoodTruck;
