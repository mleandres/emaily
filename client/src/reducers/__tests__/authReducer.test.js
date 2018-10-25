import authReducer from '../authReducer'
import { FETCH_USER } from '../../actions/types'

// want to make sure it handles correct action types
it('handles actions of type FETCH_USER', () => {
  const action = {
    type: FETCH_USER,
    payload: { id: '12345' }
  }

  const newState = authReducer(null, action)

  expect(newState).toEqual({ id: '12345' })
})

it('handles actions of unknown type', () => {
  const UNKNOWN_TYPE = 'UNKNOWN_TYPE'
  const action = {
    type: UNKNOWN_TYPE,
    payload: {}
  }
  const newState = authReducer(null, action)

  expect(newState).toEqual(null)
})
