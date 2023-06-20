import { Box, Button, Menu } from '@mui/material';
import React from 'react';

import { INotification } from '../../constant/interface/notification';

interface IProps {
  anchorEl: null | HTMLElement;
  handleMenuClose: () => void;
  notifications: INotification[];
  markAllAsRead: () => void;
}

const setInterleavedColor = (index: number) => {
  if (index % 2 == 0) return '#303338';
  else return '#1976d2';
};

export default function Notification(props: IProps) {
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
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {props.notifications.map((item: INotification, index) => (
          <Box key={item.noti_id} sx={{ width: 480, margin: '0 .5rem 1rem .5rem', color: setInterleavedColor(index) }}>
            {item.content}
          </Box>
        ))}
        <Box sx={{ margin: '0 .5rem 0 .5rem', display: 'flex', justifyContent: 'center' }}>
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              props.markAllAsRead();
              props.handleMenuClose();
            }}
          >
            Đánh dấu là đã đọc
          </Button>
        </Box>
      </Box>
    </Menu>
  );
}
