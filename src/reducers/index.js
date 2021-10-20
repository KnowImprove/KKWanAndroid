
import { combineReducers } from "redux";
import home from "../reducers/homeEvent";
import user from "./user";
import search from './search';
import wxArticle from './wxArticle';
import project from './project'
import collect from "./collect";
import coin from "./coin";


export default combineReducers({
    home,
    user,
    search,
    wxArticle,
    project,
    collect,
    coin
})

