import ArticleIcon from '@mui/icons-material/Article';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import QuizIcon from '@mui/icons-material/Quiz';
import SchoolIcon from '@mui/icons-material/School';

import { AdminRoute, GuestRoute, StudentRoute, TeacherRoute } from '../route/name';
import { AdminTab, GuestTab, StudentTab, TeacherTab } from './name';

export interface TabRedirect {
  name: string;
  icon: JSX.Element;
  param?: string;
  route?: string;
}

export const listGuestTab: TabRedirect[] = [
  { name: GuestTab.HOME, icon: <HomeIcon />, route: GuestRoute.HOME },
  { name: GuestTab.SEARCH_EXAM_INTEGRATION, icon: <ManageSearchIcon />, route: GuestRoute.SEARCH_EXAM_INTEGRATION },
];

export const listStudentTab: TabRedirect[] = [
  { name: StudentTab.CLASS, icon: <SchoolIcon />, route: StudentRoute.SEE_CLASS },
  { name: StudentTab.PUBLIC_EXAM, icon: <QuizIcon />, route: StudentRoute.SEE_EXAM },
  { name: StudentTab.HISTORY, icon: <HistoryIcon />, route: StudentRoute.HISTORY },
];

export const listTeacherTab: TabRedirect[] = [
  { name: TeacherTab.CLASS, icon: <SchoolIcon />, route: TeacherRoute.MANAGE_CLASS },
  { name: TeacherTab.EXAM, icon: <BusinessCenterIcon />, route: TeacherRoute.MANAGE_EXAM },
];

export const listAdminTab: TabRedirect[] = [
  // { name: AdminTab.DASHBOARD, icon: <DashboardIcon />, route: AdminRoute.DASHBOARD },
  { name: AdminTab.MANAGE_PUBLIC_EXAM, icon: <ArticleIcon />, route: AdminRoute.MANAGE_PUBLIC_EXAM },
  { name: AdminTab.MANAGE_USER, icon: <ManageAccountsIcon />, route: AdminRoute.MANAGE_USER },

  // define tab
];
