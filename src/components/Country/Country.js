import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { NativeSelect, FormControl } from "@material-ui/core";

import styles from "./Country.module.css";

const Country = () => {
  const { countryData, fetchCountries } = useContext(GlobalContext);

  console.log(countryData);

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div>
      <FormControl className={styles.formControl}>
        <NativeSelect>
          <option value="global">Global</option>
          {countryData.map((country, i) => (
            <option value={country} key={i}>
              {country}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default Country;
