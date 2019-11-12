/**
 * ItemListComponent
 * This is just a skeleton for the component you should
 * implement in this exercise. You can add as many additional
 * sub-components as you like.
 *
 * The state management and the expected component API
 * are already implemented for you:
 *
 * @typedef {Object} Item
 * @property {string} icon - Name of the icon.
 * @property {string} value - Value of the item.
 *
 * @param {Object} props - Properties.
 * @param {Item[]} props.items - List of items.
 * @param {Object} props.icons - Set of icons by name.
 * @param {Function} props.onAddItem - Add an item.
 * @param {Function} props.onDeleteItem - Delete an item by index.
 * @param {Function} props.onSetItem - Set an item by index.
 */

// 1 
// import React, { memo } from 'react';
// // import PropTypes from 'prop-types';
// // import styled from 'styled-components';

// function ItemListComponent({
//   items,
//   icons,
//   onAddItem,
//   onDeleteItem,
//   onSetItem,
// }) {
//   return <h1>{icons.warn} Implement your component here.</h1>;
// }

// ItemListComponent.propTypes = {};

// export default memo(ItemListComponent);

// 2
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import HeartIcon from '@material-ui/icons/Favorite';
import FaceIcon from '@material-ui/icons/Face';
import WarningIcon from '@material-ui/icons/Warning';
// import InfoIcon from '@material-ui/icons/Info';
// import EuroIcon from '@material-ui/icons/EuroSymbol';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';

const ItemListComponent = memo(props => (
  <ListItem divider={props.divider}>
    {
      {
        star: <StarIcon />,
        heart: <HeartIcon />,
        face: <FaceIcon />,
        warn: <WarningIcon />,
      }[props.icon]
    }
    <ListItemText primary={props.name} />
    <ListItemSecondaryAction>
      <IconButton aria-label="Edit Todo" onClick={props.onButtonClickEdit}>
        <EditIcon />
      </IconButton>
      <IconButton aria-label="Delete Todo" onClick={props.onButtonClickDelete}>
        <DeleteOutlined />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
));

ItemListComponent.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  divider: PropTypes.any,
  onButtonClickEdit: PropTypes.any,
  onButtonClickDelete: PropTypes.any,
};

export default ItemListComponent;
