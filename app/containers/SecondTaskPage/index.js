/**
 *
 * SecondTaskPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  List,
  Button,
  Paper,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectSecondTaskPage,
  makeResponseSelector,
  makeDataSelector,
  makeErrorSelector,
} from './selectors';
import { fetchData } from './actions';
import reducer from './reducer';
import saga from './saga';

export function SecondTaskPage({ onSubmitForm, data, error }) {
  useInjectReducer({ key: 'secondTaskPage', reducer });
  useInjectSaga({ key: 'secondTaskPage', saga });
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const tryAgain = () => {
    onSubmitForm();
  };
  useEffect(() => {
    onSubmitForm();
  }, []);
  function isEmpty(obj) {
    return Object.getOwnPropertyNames(obj).length === 0;
  }
  // console.log(data, 'datafrontend');
  return (
    <div>
      <Helmet>
        <title>SecondTaskPage</title>
        <meta name="description" content="Description of SecondTaskPage" />
      </Helmet>
      <h1 style={{ margin: 16 }}> SecondTaskPage</h1>
      <Button
        onClick={tryAgain}
        variant="contained"
        color="primary"
        style={{ margin: 16 }}
      >
        Refresh List
      </Button>
      {data && data.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List style={{ overflow: 'scroll' }}>
            {data.map((item, i) => (
              <ListItem key={i} divider>
                <ListItemText primary={item.name} />
                <ListItemText primary={item.created} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      {!isEmpty(error) && (
        <Dialog
          open={open}
          // TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {error.status}: {error.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {error.detail}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <Button onClick={tryAgain} color="primary">
              Try again
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

SecondTaskPage.propTypes = {
  data: PropTypes.array,
  error: PropTypes.object,
  onSubmitForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  secondTaskPage: makeSelectSecondTaskPage(),
  data: makeDataSelector(),
  response: makeResponseSelector(),
  error: makeErrorSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSubmitForm: () => {
      dispatch(fetchData());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SecondTaskPage);
