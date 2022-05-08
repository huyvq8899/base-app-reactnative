import { LOGIN_SUCESS, LOGIN_ERROR } from '../types';

const initialState = {
  user: {},
  error: '',
};

function userReduce(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCESS:
      return {
        ...state,
        user: action.payload,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default userReduce;
