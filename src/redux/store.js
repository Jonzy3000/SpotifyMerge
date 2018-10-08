// src/js/store/index.js
import { createStore } from "redux";
import rootReducer from "./reducers/combineReducers";

const store = createStore(rootReducer);

export default store;