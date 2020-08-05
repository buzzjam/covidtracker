import React, { createContext, useReducer } from "react";
import axios from "axios";
import Reducer from "./Reducer";

const url = "https://covid19.mathdro.id/api";

//initial state
const initialState = {
  error: null,
  loading: true,
  fetchedData: false,
  dailyData: [],
  countryData: [],
  
};

//context
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  //functions
  const fetchData = async () => {
    try {
      const {
        data: { confirmed, recovered, deaths, lastUpdate },
      } = await axios.get(url);

      const moddedData = {
        confirmed,
        recovered,
        deaths,
        lastUpdate,
      };

      dispatch({
        type: "FETCH_DATA",
        payload: moddedData,
      });
    } catch (err) {
      dispatch({
        type: "DATA_ERROR",
        payload: err.response.data.error,
      });
    }
  };

  const fetchDailyData = async () => {
    try {
      const { data } = await axios.get(`${url}/daily`);

      const moddedData = data.map((dailyData) => ({
        confirmed: dailyData.confirmed.total,
        deaths: dailyData.deaths.total,
        date: dailyData.reportDate
      }))

      dispatch({
        type: "FETCH_DAILYDATA",
        payload: moddedData,
      });
    } catch (err) {
      dispatch({
        type: "DATA_ERROR",
        payload: err.response.data.error,
      });
    }
  };

  const fetchCountries = async () => {
    try {
      const { data: {countries}  } = await axios.get(`${url}/countries`);
      
      dispatch({
        type: "FETCH_COUNTRYDATA",
        payload: countries.map(country => country.name),
      });
    } catch (err) {
      dispatch({
        type: "DATA_ERROR",
        payload: err.response.data.error,
      });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        fetchedData: state.fetchedData,
        dailyData: state.dailyData,
        countryData: state.countryData,
        loading: state.loading,
        error: state.error,
        fetchData,
        fetchDailyData,
        fetchCountries,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
