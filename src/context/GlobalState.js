import React, { createContext, useReducer } from "react";
import axios from "axios";
import Reducer from "./Reducer";

const Url = "https://covid19.mathdro.id/api";

//initial state
const initialState = {
  error: null,
  loading: true,
  fetchedData: {},
  dailyData: [],
  countryData: [],
  country: "",
};

//create context
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  //functions
  const fetchData = async (country) => {
    let adaptiveUrl = country ? `${Url}/countries/${country}` : Url;

    try {
      const {
        data: { confirmed, recovered, deaths, lastUpdate },
      } = await axios.get(adaptiveUrl);

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
      const { data } = await axios.get(`${Url}/daily`);

      const moddedData = data.map((dailyData) => ({
        confirmed: dailyData.confirmed.total,
        deaths: dailyData.deaths.total,
        date: dailyData.reportDate,
      }));

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
      const {
        data: { countries },
      } = await axios.get(`${Url}/countries`);

      dispatch({
        type: "FETCH_COUNTRYDATA",
        payload: countries.map((country) => country.name),
      });
    } catch (err) {
      dispatch({
        type: "DATA_ERROR",
        payload: err.response.data.error,
      });
    }
  };

  const changeCountry = async (country) => {
    let countryWithCheckForGlobal = (country === "global") ? "" : country

    try {
      fetchData(country);
      dispatch({
        type: "CHANGE_COUNTRY",
        payload: countryWithCheckForGlobal,
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
        country: state.country,
        countryData: state.countryData,
        loading: state.loading,
        error: state.error,
        fetchData,
        fetchDailyData,
        fetchCountries,
        changeCountry,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
