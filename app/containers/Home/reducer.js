/*
 *
 * Home reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, ADD_ITEM, DELETE_ITEM, EDIT_ITEM } from './constants';

export const initialState = {
  items: [
    {
      id: 0,
      name: 'Item One',
      icon: 'star',
    },
    {
      id: 1,
      name: 'Item Two',
      icon: 'heart',
    },
    {
      id: 2,
      name: 'Item Three',
      icon: 'face',
    },
    {
      id: 3,
      name: 'Item Four',
      icon: 'warn',
    },
  ],
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, (/*draft*/) => {
    switch (action.type) {
      case ADD_ITEM:
        return {
          ...state,
          items: state.items.concat({
            id: action.id,
            name: action.name,
            icon: action.icon,
          }),
        };
      case DELETE_ITEM:
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.id),
        };
      case EDIT_ITEM:
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.id
              ? { ...item, id: action.id, name: action.name, icon: action.icon }
              : item,
          ),
        };
      case DEFAULT_ACTION:
        break;
    }
  });

export default homeReducer;
