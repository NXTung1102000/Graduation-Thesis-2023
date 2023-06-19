import { AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getUnreadNotification } from '../api/notification';
import { HeaderApp } from '../component/header_footer/HeaderApp';
import LeftBav from '../component/header_footer/LeftBav';
import { ResponsiveMenu } from '../component/header_footer/Menu';
import { MenuUser, MenuUserMobile } from '../component/header_footer/MenuUser';
import Notification from '../component/header_footer/Notification';
import Loading from '../component/loading_notice/Loading';
import { selectLoading } from '../component/loading_notice/loadingSlide';
import Notice from '../component/loading_notice/Notice';
import { INotification } from '../constant/interface/notification';
import { name } from '../constant/name';
import { AccountRoute, GuestRoute } from '../constant/route/name';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { LogOutUser, selectAuth } from './account/AuthSlice';
import SignIn from './account/SignIn';
interface Props {
  children?: JSX.Element;
}

export default function Layout(props: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectLoading);
  const auth = useAppSelector(selectAuth);

  const [notifications, setNotifications] = React.useState<INotification[]>([]);

  const [open, setOpen] = React.useState(true);
  const [openLogin, setOpenLogin] = React.useState(false);

  const [anchorElNotification, setAnchorElNotification] = React.useState<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const [webSocket, setWebSocket] = React.useState<WebSocket | null>(null);

  const signOut = async () => {
    navigate(GuestRoute.HOME);
    dispatch(LogOutUser());
    handleMenuClose();
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      webSocket.close();
      console.log(webSocket);
      setWebSocket(null);
    }
  };

  const returnHome = () => {
    handleMenuClose();
    navigate(GuestRoute.HOME);
  };

  const openProfile = () => {
    handleMenuClose();
    navigate(AccountRoute.PROFILE);
  };

  const navigateTab = (route?: string) => {
    if (route) navigate(route);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotification(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setAnchorElNotification(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const refreshNotification = () => {
    if (auth.access_token) {
      getUnreadNotification(auth.user.user_id)
        .then((response) => response.data)
        .then((res) => {
          if (res.code == '200') {
            setNotifications(res.result);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  React.useEffect(() => {
    refreshNotification();
    const interval = setInterval(() => refreshNotification(), 15000);
    return () => {
      clearInterval(interval);
      setNotifications([]);
    };
  }, [auth]);

  return (
    <>
      <Notice />
      <Loading open={loading.isLoading} />
      <SignIn open={openLogin} setOpen={setOpenLogin} />
      <Box sx={{ display: 'flex' }}>
        <HeaderApp position="fixed" open={open}>
          <Toolbar>
            <Box sx={{ width: '100%', display: 'flex' }}>
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                <IconButton
                  size="large"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => setOpen(true)}
                  edge="start"
                  sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
                >
                  <MenuIcon />
                </IconButton>
                <IconButton>
                  <MenuBookIcon fontSize="large" sx={{ color: 'white' }} />
                </IconButton>
                <Typography variant="h6" noWrap onClick={returnHome} sx={{ cursor: 'pointer' }}>
                  {name}
                </Typography>
              </Box>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}>
                {auth.access_token && (
                  <IconButton size="large" color="inherit" onClick={handleNotificationMenuOpen}>
                    <Badge badgeContent={notifications.length} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                )}
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />

                  {!auth.access_token && <Typography noWrap>Đăng nhập</Typography>}
                </IconButton>
                <Typography variant="h6" noWrap>
                  {auth.access_token && `${auth.user.name}`}
                </Typography>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </HeaderApp>
        <Notification
          anchorEl={anchorElNotification}
          handleMenuClose={handleNotificationMenuClose}
          notifications={notifications}
        />
        <MenuUser
          anchorEl={anchorEl}
          signOut={signOut}
          openProfile={openProfile}
          setOpenLogin={setOpenLogin}
          handleMenuClose={handleMenuClose}
        />
        <MenuUserMobile
          mobileMoreAnchorEl={mobileMoreAnchorEl}
          openProfile={openProfile}
          signOut={signOut}
          setOpenLogin={setOpenLogin}
          handleMobileMenuClose={handleMobileMenuClose}
        />
        <LeftBav open={open} setOpen={setOpen} navigate={navigateTab} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <ResponsiveMenu />

          {/* code data search in here */}
          {props.children}
          {/* <Footer /> */}
        </Box>
      </Box>
    </>
  );
}
