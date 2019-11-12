/*
 *
 * SecondTaskPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  FETCH_DATA,
  SET_RESPONSE,
  SET_ERROR,
  SET_DATA,
} from './constants';

export const initialState = {
  data: [],
  response: {},
  error: {},
};

/* eslint-disable default-case, no-param-reassign */
const secondTaskPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_DATA:
        return { ...state };
      // break;
      case SET_RESPONSE:
        draft.response = action.response;
        break;
      case SET_DATA:
        // draft.data = action.data;
        // draft.error = {};
        return {
          ...state,
          error: {},
          data: state.data.concat(action.data),
        }; // break;
      case SET_ERROR:
        draft.error = action.error;
        // draft.data = [];
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default secondTaskPageReducer;
