import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import App from "./pages/App";
import DetailBook from "./pages/DetailBook";
import List from "./pages/List";
import User from "./pages/User";


const routes = [{
  path: '/',
  component: App,
  exact : true
}, {
    path: '/detail/:repo',
    component: DetailBook,
}, {
    path: '/user/:username',
    component: User,

    path: '/',
    component: List
}]

export default routes;
