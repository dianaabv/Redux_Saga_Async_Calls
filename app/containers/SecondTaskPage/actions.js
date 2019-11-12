/*
 *
 * SecondTaskPage actions
 *
 */

import { DEFAULT_ACTION, FETCH_DATA, SET_ERROR, SET_DATA } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchData(data) {
  return {
    type: FETCH_DATA,
    data,
  };
}

export function setError(error) {
  return {
    type: SET_ERROR,
    error,
  };
}

export function setData(data) {
  return {
    type: SET_DATA,
    data,
  };
}
