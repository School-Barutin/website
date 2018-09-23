import React, { Component } from "react";
import Navbar from "./components/Navbar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="content">
          <Navbar />
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
