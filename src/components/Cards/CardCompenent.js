import React from "react";
import CountUp from "react-countup";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import styles from "./Cards.module.css";
import cx from "classnames";

const CardCompenent = ({
  className,
  title,
  subtitle,
  value,
  lastUpdate,
}) => {
  return (
    <Grid
      item
      component={Card}
      xs={12}
      md={2}
      className={cx(styles.card, className)}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5">
          <CountUp start={0} end={value} duration={1} separator="," />
        </Typography>
        <Typography color="textSecondary">
          {new Date(lastUpdate).toDateString()}
        </Typography>
        <Typography variant="body2"> {subtitle}</Typography>
      </CardContent>
    </Grid>
  );
};

export default CardCompenent