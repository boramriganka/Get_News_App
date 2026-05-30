import { thunk } from "redux-thunk";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import Reducers from "../reducers/reducers";


//--- MIDDLEWARE
// add middleware inside this function
const middleware= applyMiddleware(thunk);


//--- STORE
const store= createStore(Reducers, middleware);

export default store;
