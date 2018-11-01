import axios from 'axios'
import { FETCH_USER, FETCH_SURVEYS } from './types'

// define action creator
// refactored action creator to use redux-thunk
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

// Redux thunk
//  big funnel waiting for actions
//  1. action creator produces an action
//  2. action is passed to dispatch function
//  3. dispatch sends the reducers to all the reducers and then instantly recalculates the app state
//  redux thunk gives direct access to dispatch function.
//  why do we want this?
//  want to be able to "bend the rules" and dispatch an action whenever we want rather than returning
//  an action directly after creation

// if redux thunk middleware sees a function returned instead of a regular action,
// it will automatically run that function. (function takes a 'dispatch' argument)

// redux think will call this function and wait until response is back
// after getting response from api, the action that was created will be dispatched to reducers

export const handleStripeToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  // redirects user. (not sure if i like this, would rather only redirect if successful)
  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data.reverse() });
};
