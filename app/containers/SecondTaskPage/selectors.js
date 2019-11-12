import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the secondTaskPage state domain
 */

const selectSecondTaskPageDomain = state =>
  state.secondTaskPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SecondTaskPage
 */

const makeSelectSecondTaskPage = () =>
  createSelector(
    selectSecondTaskPageDomain,
    substate => substate,
  );

const makeDataSelector = () =>
  createSelector(
    selectSecondTaskPageDomain,
    substate => substate.data,
  );
const makeResponseSelector = () =>
  createSelector(
    selectSecondTaskPageDomain,
    substate => substate.response,
  );
const makeErrorSelector = () =>
  createSelector(
    selectSecondTaskPageDomain,
    substate => substate.error,
  );
// export default makeSelectSecondTaskPage;
export {
  makeSelectSecondTaskPage,
  selectSecondTaskPageDomain,
  makeDataSelector,
  makeResponseSelector,
  makeErrorSelector,
};
