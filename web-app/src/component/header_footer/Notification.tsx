import { Menu, MenuItem } from '@mui/material';
import React from 'react';

import { INotification } from '../../constant/interface/notification';
import { selectAuth } from '../../page/account/AuthSlice';
import { useAppSelector } from '../../store/hook';

interface IProps {
  anchorEl: null | HTMLElement;
  handleMenuClose: () => void;
  notifications: INotification[];
}

export default function Notification(props: IProps) {
  const auth = useAppSelector(selectAuth);
  return (
    <Menu
      anchorEl={props.anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(props.anchorEl)}
      onClose={props.handleMenuClose}
    >
      {auth.access_token &&
        props.notifications.map((item: INotification) => <MenuItem key={item.noti_id}>{item.content}</MenuItem>)}
    </Menu>
  );
}
