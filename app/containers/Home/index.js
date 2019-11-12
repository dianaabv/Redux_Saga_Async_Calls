/**
 *
 * Home
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// css
import CssBaseline from '@material-ui/core/CssBaseline';
import StarIcon from '@material-ui/icons/Star';
import HeartIcon from '@material-ui/icons/Favorite';
import FaceIcon from '@material-ui/icons/Face';
import WarningIcon from '@material-ui/icons/Warning';
// import InfoIcon from '@material-ui/icons/Info';
// import EuroIcon from '@material-ui/icons/EuroSymbol';
import ItemListComponent from 'components/ItemListComponent';

// probably will migrate to component
import {
  AppBar,
  List,
  Button,
  Toolbar,
  Typography,
  Paper,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

// redux
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { addItem, deleteItem, editItem } from './actions';
import { makeSelectHome, makeItemsSelector } from './selectors';
import reducer from './reducer';
import saga from './saga';

const initialItems = [
  { icon: 'star', value: 'Item One' },
  { icon: 'heart', value: 'Item Two' },
  { icon: 'face', value: 'Item Three' },
  { icon: 'warn', value: 'Item Four' },
];

export function Home({ items, onAddItem, onDeleteItem, onEditItem }) {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });
  const [open, setOpen] = React.useState(false);
  const [openDel, setOpenDel] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [itemName, setItemName] = useState('');
  const [itemDel, setItemDel] = useState({});
  const [itemEdit, setItemEdit] = useState({});
  const [iconName, setIconName] = React.useState({
    open: false,
    icon: '',
  });

  // const handleChange = icon = event => {
  const handleChange = icon => event => {
    setIconName({ ...iconName, [icon]: event.target.value || '' });
  };

  const handleOpenAdd = () => {
    setOpen(true);
  };

  const handleCloseAdd = () => {
    setOpen(false);
  };

  const handleOpenDel = id => {
    setOpenDel(true);
    setItemDel(id);
  };

  const handleCloseDel = () => {
    setOpenDel(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenEdit = item => {
    setOpenEdit(true);
    setItemEdit(item);
  };

  const onItemAdd = () => {
    const nextId = items.length;
    onAddItem(nextId, itemName, iconName.icon);
    setOpen(false);
    setIconName({
      open: false,
      icon: '',
    });
    setItemName('');
  };

  const onItemEdit = () => {
    onEditItem(itemEdit.id, itemName, iconName.icon);
    setOpenEdit(false);
  };

  const onItemDelete = () => {
    if (typeof itemDel.id === 'number') {
      onDeleteItem(itemDel.id);
      setItemDel('');
      setOpenDel(false);
    }
  };

  return (
    <div>
      <CssBaseline />
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      <Paper
        elevation={0}
        style={{ padding: 0, margin: 0, backgroundColor: '#fafafa' }}
      >
        <AppBar color="primary" position="static" style={{ height: 64 }}>
          <Toolbar style={{ height: 64 }}>
            <Typography color="inherit">Play Ground</Typography>
          </Toolbar>
        </AppBar>
      </Paper>
      {items.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List style={{ overflow: 'scroll' }}>
            {items.map((item, index) => (
              <ItemListComponent
                {...item}
                key={item.id}
                divider={index !== items.length - 1}
                // onButtonClickEdit={() => onItemEdit(index, 'test', 'warn')}
                // onButtonClickDelete={() => onItemDelete(index)}
                onButtonClickEdit={() => handleOpenEdit(item)}
                onButtonClickDelete={() => handleOpenDel(item)}
              />
            ))}
          </List>
        </Paper>
      )}
      <div style={{ margin: 16 }}>
        <Button onClick={handleOpenAdd} variant="contained">
          Add Item
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleCloseAdd}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Item name"
            type="text"
            onChange={e => setItemName(e.target.value)}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>
            <Select onChange={handleChange('icon')} value={iconName.icon}>
              {initialItems.map(item => (
                <MenuItem key={item.value} value={item.icon}>
                  {
                    {
                      star: <StarIcon />,
                      heart: <HeartIcon />,
                      face: <FaceIcon />,
                      warn: <WarningIcon />,
                    }[item.icon]
                  }
                  <span className="MuiListItemText-root">
                    <span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1">
                      {item.icon}
                    </span>
                  </span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="primary">
            Cancel
          </Button>
          <Button onClick={onItemAdd} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDel}
        // onClose={handleCloseDel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Delete {itemDel.name || ''}
        </DialogTitle>
        <DialogContent>
          Are you sure that you want to delete this item?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDel} color="primary">
            No
          </Button>
          <Button onClick={() => onItemDelete()} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Item name"
            type="text"
            defaultValue={itemEdit.name}
            onChange={e => setItemName(e.target.value)}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>
            <Select onChange={handleChange('icon')} value={iconName.icon}>
              {initialItems.map(item => (
                <MenuItem key={item.value} value={item.icon}>
                  {
                    {
                      star: <StarIcon />,
                      heart: <HeartIcon />,
                      face: <FaceIcon />,
                      warn: <WarningIcon />,
                    }[item.icon]
                  }
                  <span className="MuiListItemText-root">
                    <span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1">
                      {item.icon}
                    </span>
                  </span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={onItemEdit} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Home.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  items: PropTypes.array,
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
  items: makeItemsSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onAddItem: (id, name, icon) => dispatch(addItem(id, name, icon)),
    onDeleteItem: id => dispatch(deleteItem(id)),
    onEditItem: (id, name, icon) => dispatch(editItem(id, name, icon)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Home);
