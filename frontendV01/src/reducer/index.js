import { combineReducers, createStore } from "redux";

import hallsReducer from "./halls/index";
import loginReducer from "../reducer/login/index";
const reducers = combineReducers({
  hallsReducer,
  loginReducer,
});

const store = createStore(reducers);

export default store;
