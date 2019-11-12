/*
 *
 * Home actions
 *
 */

import { DEFAULT_ACTION, ADD_ITEM, DELETE_ITEM, EDIT_ITEM } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function addItem(id, name, icon) {
  return {
    type: ADD_ITEM,
    id,
    name,
    icon,
  };
}
export function deleteItem(id) {
  return {
    type: DELETE_ITEM,
    id,
  };
}
export function editItem(id, name, icon) {
  return {
    type: EDIT_ITEM,
    id,
    name,
    icon,
  };
}
