import React from "react";
import { render } from "react-dom";
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import "./firebaseConfig";

import App from "./App";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Achievments from "./pages/Achievments";
import "./index.css";

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/achievements" component={Achievments} />
    </Route>
  </Router>,
  document.querySelector("#root")
);
