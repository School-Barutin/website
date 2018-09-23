import React from "react";
import { render } from "react-dom";
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/schedule" component={Schedule} />
    </Route>
  </Router>,
  document.querySelector("#root")
);
