import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import styles from "./Cards.module.css";
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";
import CountUp from "react-countup";
import cx from "classnames";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Cards = () => {
  const { fetchedData, fetchData } = useContext(GlobalContext);

  useEffect(() => {
    fetchData();
  }, []);

  if (!fetchedData) {
    return <PuffLoader css={override} size={100} color={"#123abc"} />;
  }

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={fetchedData.confirmed.value}
                duration={3}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(fetchedData.lastUpdate).toDateString()}
            </Typography>
            <Typography variant="body2">Active COVID cases</Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
              {" "}
              <CountUp
                start={0}
                end={fetchedData.recovered.value}
                duration={3}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(fetchedData.lastUpdate).toDateString()}
            </Typography>
            <Typography variant="body2">Active COVID cases</Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.deaths)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              {" "}
              <CountUp
                start={0}
                end={fetchedData.deaths.value}
                duration={3}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(fetchedData.lastUpdate).toDateString()}
            </Typography>
            <Typography variant="body2">Active COVID cases</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;
