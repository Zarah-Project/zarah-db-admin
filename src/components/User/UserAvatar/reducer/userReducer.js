import {
  SET_USER
} from "../../../../store/actionTypes";

const initialState = {
  username: '',
  firstName: '',
  lastName: '',
  groups: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        username: action.payload.username,
        firstName: action.payload.first_name,
        lastName: action.payload.last_name,
        groups: action.payload.groups
      }
    }
    default: {
      return { ...state };
    }
  }
}

export default userReducer;
