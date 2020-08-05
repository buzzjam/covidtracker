import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = () => {
  const { dailyData, fetchDailyData, fetchedData, country } = useContext(
    GlobalContext
  );

  useEffect(() => {
    fetchDailyData();
  }, []);

  const activeValue =
    Object.keys(fetchedData).length !== 0
      ? fetchedData.confirmed.value -
        fetchedData.recovered.value -
        fetchedData.deaths.value
      : null;

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            callback(value) {
              return Number(value).toLocaleString("en");
            },
          },
        },
      ],
    },
  };

  const lineChart = dailyData[0] ? (
    <Line
      options={options}
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

  const barChart =
    Object.keys(fetchedData).length !== 0 ? (
      <Bar
        data={{
          labels: ["Infected", "Recovered", "Deaths", "Active"],
          datasets: [
            {
              label: "People",
              backgroundColor: [
                "rgba(218, 218, 8, 0.75)",
                "rgba(1, 177, 1, 0.75)",
                "rgba(189, 5, 5, 0.75)",
                "rgba(67, 67, 185, 0.75)",
              ],
              data: [
                fetchedData.confirmed.value,
                fetchedData.recovered.value,
                fetchedData.deaths.value,
                activeValue,
              ],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
          scales: options.scales,
        }}
      />
    ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
