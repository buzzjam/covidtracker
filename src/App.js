import React from "react";
import { Cards, Chart, Country } from "./components";
import styles from "./App.module.css";
import { GlobalProvider, GlobalContext } from "./context/GlobalState";

function App() {


  return (
    <GlobalProvider>
      <div className={styles.container}>
        <Cards />
        <Country />
        <Chart />
      </div>
    </GlobalProvider>
  );
}

export default App;
