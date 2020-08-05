import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = () => {
  const { dailyData, fetchDailyData } = useContext(GlobalContext);

  useEffect(() => {
    fetchDailyData();
  }, []);

  const lineChart = dailyData[0] ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#f7e83e",
            backgroundColor: "rgba(247,232,20,0.3)",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "#f00",
            backgroundColor: "rgba(255,0,0,0.3)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return <div className={styles.container}>
    {lineChart}
  </div>;
};

export default Chart;
