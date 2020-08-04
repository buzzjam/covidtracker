import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";

const Chart = () => {
  const { dailyData, fetchDailyData } = useContext(GlobalContext);

  useEffect(() => {
    fetchDailyData();
  }, []);


  return <div>Chart</div>;
};

export default Chart;
