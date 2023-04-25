import { AccountCircle } from '@mui/icons-material';
import HistoryIcon from '@mui/icons-material/History';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton, Menu, MenuItem } from '@mui/material';

import { selectAuth } from '../../page/sign_in/AuthSlice';
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
      <MenuItem onClick={props.openProfile}>Profile</MenuItem>
      <MenuItem onClick={props.signOut}>Log out</MenuItem>
      <MenuItem
        onClick={() => {
          props.setOpenLogin(true);
          props.handleMenuClose();
        }}
      >
        Log in
      </MenuItem>
    </Menu>
  );
}

interface IPropsMobile {
  numProduct: number;
  mobileMoreAnchorEl: null | HTMLElement;
  signOut: () => void;
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
      <MenuItem onClick={props.signOut}>
        <IconButton size="large" color="inherit">
          <LogoutIcon />
        </IconButton>
        <p>Log out</p>
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
        <p>Log in</p>
      </MenuItem>
    </Menu>
  );
}
