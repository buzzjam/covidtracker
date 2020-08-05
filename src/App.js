import React from "react";
import { Cards, Chart, Country } from "./components";
import styles from "./App.module.css";
import { GlobalProvider } from "./context/GlobalState";

function App() {


  return (
    <GlobalProvider>
      <div className={styles.container}>
        <img className ={styles.image} src= {"https://www.un.org/sites/un2.un.org/files/covid19_response_icon.svg"} alt ="COVID-19"></img>
        <Cards />
        <Country />
        <Chart />
      </div>
    </GlobalProvider>
  );
}

export default App;
