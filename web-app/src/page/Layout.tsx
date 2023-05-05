import { AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MoreIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { HeaderApp } from '../component/header_footer/HeaderApp';
import LeftBav from '../component/header_footer/LeftBav';
import { ResponsiveMenu } from '../component/header_footer/Menu';
import { MenuUser, MenuUserMobile } from '../component/header_footer/MenuUser';
import { name } from '../constant/name';
// import Loading from '../component/LoadingAndNotice/Loading';
// import { selectLoading } from '../component/LoadingAndNotice/loadingSlice';
// import Notice from '../component/LoadingAndNotice/Notice';
import { AccountRoute, GuestRoute } from '../constant/route/name';
import { useAppDispatch, useAppSelector } from '../store/hook';
import SignIn from './account/SignIn';

interface Props {
  children?: JSX.Element;
}

export default function Layout(props: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const signOut = () => {
    navigate(GuestRoute.HOME);
    // dispatch(LogOutUser());
    handleMenuClose();
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

  return (
    <>
      {/* <Notice /> */}
      {/* <Loading open={loading.isLoading} /> */}
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
              <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
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
