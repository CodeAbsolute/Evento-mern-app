import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userReducer } from "./Reducers/userReducer";

import { eventsReducer, newEventReducer } from "./Reducers/eventReducer";

const reducer = combineReducers({
  user: userReducer,
  events: eventsReducer,
  myevents: eventsReducer,
  addevent: newEventReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
