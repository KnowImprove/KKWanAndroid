
import { combineReducers } from "redux";
import home from "../reducers/homeEvent";
import user from "./user";
import search from './search';


export default combineReducers({
    home,
    user,
    search
})

