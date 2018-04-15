import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import routes from "./routes";


const Root = () => {
  const routeComponents = routes.map(({ path, component, exact }, key) => {
    let routeComponent = null;
    if (exact && exact === true) {
      routeComponent = <Route exact path={path} component={component} />;
    } else {
      routeComponent = <Route path={path} component={component} />;
    }
    return routeComponent;
  });
  return (
    <BrowserRouter>
      <Switch>{routeComponents}</Switch>
    </BrowserRouter>
  );
};

render(<Root />, document.getElementById("root"));
