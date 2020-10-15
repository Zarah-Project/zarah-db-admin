import {SET_TABLE_SEARCH} from "../actionTypes";

export default function setTableSearch(search, tableName) {
  return {
    type: SET_TABLE_SEARCH,
    payload: {
      tableName: tableName,
      search: search
    }
  }
}
