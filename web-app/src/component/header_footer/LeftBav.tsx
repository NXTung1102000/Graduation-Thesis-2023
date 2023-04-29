import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { IconButton } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import React from 'react';

import {
  listAdminTab,
  listGuestTab,
  listStudentTab,
  listTeacherTab,
  TabRedirect,
} from '../../constant/tab_redirect/tab_redirect';
import { selectAuth } from '../../page/account/AuthSlice';
import CreateAccountTeacher from '../../page/admin/CreateAccountTeacher';
import { useAppSelector } from '../../store/hook';
import { Menu, ResponsiveMenu } from './Menu';
interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  navigate: (route?: string) => void;
}

export default function LeftBav(props: IProps) {
  const auth = useAppSelector(selectAuth);
  const [openCreate, setOpenCreate] = React.useState(false);
  const theme = useTheme();

  return (
    <>
      <CreateAccountTeacher open={openCreate} setOpen={setOpenCreate} />
      <Menu variant="permanent" open={props.open}>
        <ResponsiveMenu>
          <IconButton onClick={() => props.setOpen(false)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </ResponsiveMenu>
        <Divider />
        <List>
          {listGuestTab.map((tab) => (
            <ListItem key={tab.name} disablePadding sx={{ display: 'block' }} onClick={() => props.navigate(tab.route)}>
              <ListItemButton sx={{ minHeight: 48, justifyContent: props.open ? 'initial' : 'center', px: 2.5 }}>
                <ListItemIcon sx={{ minWidth: 0, mr: props.open ? 3 : 'auto', justifyContent: 'center' }}>
                  {tab.icon}
                </ListItemIcon>
                <ListItemText primary={tab.name} sx={{ opacity: props.open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <>
          <List>
            {listStudentTab.map((tab) => (
              <ListItem
                key={tab.name}
                disablePadding
                sx={{ display: 'block' }}
                onClick={() => props.navigate(tab.route)}
              >
                <ListItemButton sx={{ minHeight: 48, justifyContent: props.open ? 'initial' : 'center', px: 2.5 }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: props.open ? 3 : 'auto', justifyContent: 'center' }}>
                    {tab.icon}
                  </ListItemIcon>
                  <ListItemText primary={tab.name} sx={{ opacity: props.open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </>
        <>
          <List>
            {listTeacherTab.map((tab) => (
              <ListItem
                key={tab.name}
                disablePadding
                sx={{ display: 'block' }}
                onClick={() => props.navigate(tab.route)}
              >
                <ListItemButton sx={{ minHeight: 48, justifyContent: props.open ? 'initial' : 'center', px: 2.5 }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: props.open ? 3 : 'auto', justifyContent: 'center' }}>
                    {tab.icon}
                  </ListItemIcon>
                  <ListItemText primary={tab.name} sx={{ opacity: props.open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </>
        <>
          <List>
            {listAdminTab.map((tab) => (
              <ListItem
                key={tab.name}
                disablePadding
                sx={{ display: 'block' }}
                onClick={() => props.navigate(tab.route)}
              >
                <ListItemButton sx={{ minHeight: 48, justifyContent: props.open ? 'initial' : 'center', px: 2.5 }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: props.open ? 3 : 'auto', justifyContent: 'center' }}>
                    {tab.icon}
                  </ListItemIcon>
                  <ListItemText primary={tab.name} sx={{ opacity: props.open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setOpenCreate(true)}>
              <ListItemButton sx={{ minHeight: 48, justifyContent: props.open ? 'initial' : 'center', px: 2.5 }}>
                <ListItemIcon sx={{ minWidth: 0, mr: props.open ? 3 : 'auto', justifyContent: 'center' }}>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Tạo tài khoản giáo viên" sx={{ opacity: props.open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </>
      </Menu>
    </>
  );
}
