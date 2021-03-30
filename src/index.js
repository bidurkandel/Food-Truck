import React from "react";
import ReactDOM from "react-dom";

import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

import {Provider} from "react-redux";
import thunk from "redux-thunk";

import {rootReducer} from "./reducers";

import "./index.css";
import App from "./App";
import "semantic-ui-css/semantic.min.css";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
