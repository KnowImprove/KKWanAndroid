
import { combineReducers } from "redux";
import home from "../reducers/homeEvent";
import user from "./user";

export default combineReducers({
    home,
    user,
})

