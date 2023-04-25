import DashboardIcon from '@mui/icons-material/Dashboard';

import { AdminTab, GuestTab, StudentTab, TeacherTab } from './name';

export interface TabRedirect {
  name: string;
  icon: JSX.Element;
  param?: string;
  route?: string;
}

export const listGuestTab: TabRedirect[] = [{ name: GuestTab.HOME, icon: <DashboardIcon />, route: '' }];

export const listStudentTab: TabRedirect[] = [
  { name: StudentTab.CLASS, icon: <DashboardIcon />, route: '' },
  { name: StudentTab.HISTORY, icon: <DashboardIcon />, route: '' },
];

export const listTeacherTab: TabRedirect[] = [
  { name: TeacherTab.CLASS, icon: <DashboardIcon />, route: '' },
  { name: TeacherTab.EXAM, icon: <DashboardIcon />, route: '' },
];

export const listAdminTab: TabRedirect[] = [
  { name: AdminTab.DASHBOARD, icon: <DashboardIcon />, route: '' },
  // define tab
];
