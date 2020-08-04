import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";

const Country = () => {
  const { fetchedData, fetchData } = useContext(GlobalContext);

  useEffect(() => {
    fetchData();
  }, []);

return <div>Country</div>;
};

export default Country;
