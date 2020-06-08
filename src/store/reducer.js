import { combineReducers } from "redux";
import userReducer from "../components/User/UserAvatar/reducer/userReducer";

const reducer = combineReducers(
  {
    user: userReducer,
  }
);

export default reducer;
