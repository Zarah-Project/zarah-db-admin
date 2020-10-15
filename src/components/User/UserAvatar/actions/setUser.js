import {SET_USER} from "../../../../store/actionTypes";

export default function setUser(userData) {
  return {
    type: SET_USER,
    payload: userData
  }
}
