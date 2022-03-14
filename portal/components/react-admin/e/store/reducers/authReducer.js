import { USER_UPDATES, DECREMENT_COUNTER } from '../actions';

const initialState = {
  isLoggedIn: false,
  user: undefined,
  counter: 10,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_UPDATES:
      return { ...state, isLoggedIn: action.isLoggedIn, user: action.user };
    case DECREMENT_COUNTER:
      return {
        ...state,
        counter: state.counter - 1 > 0 ? state.counter - 1 : 0,
      };
    default:
      return state;
  }
};
