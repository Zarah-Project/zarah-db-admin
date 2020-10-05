import {
  SET_TABLE_PAGINATION, SET_TABLE_SEARCH,
  SET_TABLE_SORTER,
  SET_TABLE_TOTAL
} from "../actionTypes";

const initialState = {};

function tableReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TABLE_PAGINATION: {
      const newState = Object.assign({}, state[action.payload.tableName], {
        pagination: action.payload.pagination
      });
      return {
        ...state,
        [action.payload.tableName]: newState
      }
    }
    case SET_TABLE_SORTER: {
      const newState = Object.assign({}, state[action.payload.tableName], {
        sorter: action.payload.sorter
      });
      return {
        ...state,
        [action.payload.tableName]: newState
      }
    }
    case SET_TABLE_TOTAL: {
      const newState = Object.assign({}, state[action.payload.tableName]['pagination'], {
        total: action.payload.total
      });
      return {
        ...state,
        [action.payload.tableName]: {
          ...state[action.payload.tableName],
          pagination: newState
        }
      }
    }
    case SET_TABLE_SEARCH: {
      const newState = Object.assign({}, state[action.payload.tableName], {
        search: action.payload.search
      });
      return {
        ...state,
        [action.payload.tableName]: newState
      }
    }
    default: {
      return { ...state };
    }
  }
}

export default tableReducer;
