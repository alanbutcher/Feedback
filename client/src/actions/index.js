import axios from 'axios';
import { FETCH_USER } from './types';

//ACTION CREATOR GET CURRENT USER MODEL
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};
//ACTION CREATOR UPDATE USER MODEL WITH AMOUNT OF CREDITS
export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token); //response to post req is updated user model with new credits

  dispatch({ type: FETCH_USER, payload: res.data });
}


