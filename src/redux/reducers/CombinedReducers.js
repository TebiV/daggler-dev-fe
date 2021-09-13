import { combineReducers } from "redux";
import tokenReducer from "./TokenReducer";

const combinedReducers = combineReducers({
    tokenReducer
});

export default combinedReducers;