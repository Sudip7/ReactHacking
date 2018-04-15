import React from "react";

import List from "./List";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Unofficial GitHub Browser v0.1</h1>
        <List />
        {this.props.children}
      </div>
    );
  }
}

export default App;
