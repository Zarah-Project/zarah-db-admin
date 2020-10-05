import {SET_TABLE_PAGINATION} from "../actionTypes";

export default function setTablePagination(pagination, tableName) {
  return {
    type: SET_TABLE_PAGINATION,
    payload: {
      tableName: tableName,
      pagination: pagination
    }
  }
}
