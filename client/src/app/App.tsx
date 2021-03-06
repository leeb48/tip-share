import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Routes from "../Routes";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes />
    </Router>
  );
}

export default App;
