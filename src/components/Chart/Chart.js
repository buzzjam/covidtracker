import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = () => {
  const { dailyData, fetchDailyData } = useContext(GlobalContext);

  useEffect(() => {
    fetchDailyData();
  }, []);

  const lineChart = (
    dailyData[0] ? (
      <Line
      data={{
        labels: "",
        datasets: [{}, {}],
      }}
    />
    ) : null
  );

  return <div>Chart</div>;


};

export default Chart;
