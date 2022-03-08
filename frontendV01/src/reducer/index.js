import { combineReducers, createStore } from "redux";

import hallsReducer from "./halls/index";
const reducers = combineReducers({
  hallsReducer,
});

const store = createStore(reducers);

export default store;
