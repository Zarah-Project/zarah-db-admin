import { combineReducers } from "redux";
import userReducer from "../components/User/UserAvatar/reducer/userReducer";
import tableReducer from "./reducer/tableReducer";

const reducer = combineReducers(
  {
    user: userReducer,
    tableSettings: tableReducer,
  }
);

export default reducer;
