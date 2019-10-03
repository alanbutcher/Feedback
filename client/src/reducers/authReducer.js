import { FETCH_USER } from '../actions/types';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;  
  }
}

//authReducer looking for FETCH_USER in actions, can be either current user or updated user