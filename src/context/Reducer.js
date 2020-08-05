export default (state, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        loading: false,
        fetchedData: action.payload,
      };
    case "FETCH_DAILYDATA":
      return {
        ...state,
        loading: false,
        dailyData: action.payload,
      };
    case "FETCH_COUNTRYDATA":
      return {
        ...state,
        loading: false,
        countryData: action.payload,
      };
    case "DATA_ERROR":
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
