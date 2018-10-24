import { FETCH_USER } from '../actions/types'

// 3 return states
// null = dont know if user is logged in or not
// User Model = object containing the user ID
// false = request done and user is NOT logged in
export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      // if payload is an empty string, will return boolean value of false (since '' is a falsy value)
      return action.payload || false
    default:
      return state
  }
}
