import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { theme } from "config/muiTheme";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./app/store";

const render = () => {
  const App = require("./app/App").default;

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <CssBaseline>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </CssBaseline>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

render();

// allow app hot reload
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./app/App", render);
}
