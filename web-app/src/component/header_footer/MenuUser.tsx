import { AccountCircle } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton, Menu, MenuItem } from '@mui/material';

import { selectAuth } from '../../page/account/AuthSlice';
import { useAppSelector } from '../../store/hook';

interface IProps {
  anchorEl: null | HTMLElement;
  handleMenuClose: () => void;
  openProfile: () => void;
  signOut: () => void;
  setOpenLogin: (open: boolean) => void;
}

export function MenuUser(props: IProps) {
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
      {auth.access_token && <MenuItem onClick={props.openProfile}>Tài khoản</MenuItem>}
      {auth.access_token && <MenuItem onClick={props.signOut}>Đăng xuất</MenuItem>}
      {!auth.access_token && (
        <MenuItem
          onClick={() => {
            props.setOpenLogin(true);
            props.handleMenuClose();
          }}
        >
          Đăng nhập
        </MenuItem>
      )}
    </Menu>
  );
}

interface IPropsMobile {
  mobileMoreAnchorEl: null | HTMLElement;
  signOut: () => void;
  openProfile: () => void;
  setOpenLogin: (open: boolean) => void;
  handleMobileMenuClose: () => void;
}

export function MenuUserMobile(props: IPropsMobile) {
  const auth = useAppSelector(selectAuth);
  return (
    <Menu
      anchorEl={props.mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(props.mobileMoreAnchorEl)}
      onClose={props.handleMobileMenuClose}
    >
      <MenuItem onClick={props.openProfile}>
        <IconButton size="large" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Tài khoản</p>
      </MenuItem>
      <MenuItem onClick={props.signOut}>
        <IconButton size="large" color="inherit">
          <LogoutIcon />
        </IconButton>
        <p>Đăng xuất</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          props.setOpenLogin(true);
          props.handleMobileMenuClose();
        }}
      >
        <IconButton size="large" color="inherit">
          <LoginIcon />
        </IconButton>
        <p>Đăng nhập</p>
      </MenuItem>
    </Menu>
  );
}
