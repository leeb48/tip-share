import Alerts from "components/alert/Alerts";
import { authenticateUserFromJWT } from "components/auth/authSlice";
import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Routes from "../Routes";
import { useAppDispatch } from "./store";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authenticateUserFromJWT());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Alerts />
      <Routes />
    </Router>
  );
}

export default App;
