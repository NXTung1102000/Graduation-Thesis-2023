import { AlertColor, Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { clearNotice, selectNotice } from './noticeSlice';

const colorText = (type: AlertColor) => {
  switch (type) {
    case 'success':
      return 'rgb(46, 125, 50)';
    case 'error':
      return 'rgb(211, 47, 47)';
    case 'warning':
      return 'rgb(237, 108, 2)';
    case 'info':
      return 'rgb(2, 136, 209)';
    default:
      return '';
  }
};

export default function Notice() {
  const dispatch = useAppDispatch();
  const nowNotice = useAppSelector(selectNotice);
  return (
    <Dialog open={nowNotice.open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogContent>
        <DialogContentText color={colorText(nowNotice.type)}>{nowNotice.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(clearNotice())}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
