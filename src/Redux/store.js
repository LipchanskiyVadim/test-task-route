import { mainReducer } from "./reducers/reducer";

const { createStore } = require("redux");

export const store = createStore(mainReducer)