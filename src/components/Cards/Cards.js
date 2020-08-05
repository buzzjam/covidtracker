import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import CountUp from "react-countup";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import styles from "./Cards.module.css";
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";
import cx from "classnames";
import CardCompenent from "./CardCompenent";

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

  if (Object.keys(fetchedData).length === 0) {
    return <PuffLoader css={override} size={100} color={"#123abc"} />;
  }

  const activeValue =
    fetchedData.confirmed.value -
    fetchedData.recovered.value -
    fetchedData.deaths.value;

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <CardCompenent
          className={styles.infected}
          title="Infected"
          value={fetchedData.confirmed.value}
          lastUpdate={fetchedData.lastUpdate}
          subtitle="Total cases from COVID-19."
        />
        <CardCompenent
          className={styles.recovered}
          title="Recovered"
          value={fetchedData.recovered.value}
          lastUpdate={fetchedData.lastUpdate}
          subtitle="Recoveries from COVID-19."
        />
        <CardCompenent
          className={styles.deaths}
          title="Deaths"
          value={fetchedData.deaths.value}
          lastUpdate={fetchedData.lastUpdate}
          subtitle="Deaths from COVID-19."
        />
        <CardCompenent
          className={styles.active}
          title="Active Cases"
          value={activeValue}
          lastUpdate={fetchedData.lastUpdate}
          subtitle="Active cases from COVID-19."
        />
      </Grid>
    </div>
  );
};

export default Cards;
