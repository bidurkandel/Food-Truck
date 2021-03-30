import {combineReducers} from "redux";

import {diner} from "./diner";
import {operator} from "./operator";

export const rootReducer = combineReducers({
  diner,
  operator,
});
