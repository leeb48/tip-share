import Alerts from "components/alert/Alerts";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Routes from "../Routes";

function App() {
  return (
    <Router>
      <Navbar />
      <Alerts />
      <Routes />
    </Router>
  );
}

export default App;
