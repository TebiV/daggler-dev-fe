import { combineReducers } from "redux";
import tokenReducer from "./TokenReducer";

const allReducers = combineReducers({
    tokenReducer
});

export default allReducers;