import Profile from '../../page/account/Profile';
import Statistic from '../../page/admin/Statistic';
import SearchExamIntegration from '../../page/guest/SearchExamIntegration';
import Home from '../../page/Home';
import DoExam from '../../page/student/DoExam';
import History from '../../page/student/History';
import PublicExam from '../../page/student/PublicExam';
import StudentClass from '../../page/student/StudentClass';
import ManageClass from '../../page/teacher/ManageClass';
import ManageExam from '../../page/teacher/ManageExam';
import { AccountRoute, AdminRoute, GuestRoute, StudentRoute, TeacherRoute } from './name';

export interface Router_Component {
  router: string;
  component: JSX.Element;
}

export const GuestRouter: Router_Component[] = [
  { router: GuestRoute.HOME, component: <Home /> },
  { router: GuestRoute.SEARCH_EXAM_INTEGRATION, component: <SearchExamIntegration /> },
  // define router
];

export const AccountRouter: Router_Component[] = [
  { router: AccountRoute.PROFILE, component: <Profile /> },
  //
];

export const StudentRouter: Router_Component[] = [
  { router: StudentRoute.HISTORY, component: <History /> },
  { router: StudentRoute.SEE_CLASS, component: <StudentClass /> },
  { router: StudentRoute.SEE_EXAM, component: <PublicExam /> },
  { router: StudentRoute.DO_EXAM, component: <DoExam /> },
];

export const TeacherRouter: Router_Component[] = [
  { router: TeacherRoute.MANAGE_CLASS, component: <ManageClass /> },
  { router: TeacherRoute.MANAGE_EXAM, component: <ManageExam /> },
];

export const AdminRouter: Router_Component[] = [
  { router: AdminRoute.DASHBOARD, component: <Statistic /> },
  //
];
