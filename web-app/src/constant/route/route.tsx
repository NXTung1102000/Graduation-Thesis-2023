import Profile from '../../page/account/Profile';
import ManagePublicExam from '../../page/admin/managePublicExam/ManagePublicExam';
import ManageUser from '../../page/admin/manageUser/ManageUser';
import Statistic from '../../page/admin/Statistic';
import SearchExamIntegration from '../../page/guest/SearchExamIntegration';
import Home from '../../page/Home';
import ExamHistory from '../../page/student/examhistory/ExamHistory';
import ExamTaking from '../../page/student/examtaking/ExamTaking';
import PublicExam from '../../page/student/publicexam/PublicExam';
import StudentClass from '../../page/student/studentclass/StudentClass';
import StudentExamClass from '../../page/student/studentexamclass/StudentExamClass';
import TeacherClass from '../../page/teacher/teacherclass/TeacherClass';
import TeacherClassDetail from '../../page/teacher/teacherclassdetail/TeacherClassDetail';
import TeacherExam from '../../page/teacher/teacherexam/TeacherExam';
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
  { router: StudentRoute.HISTORY, component: <ExamHistory /> },
  { router: StudentRoute.SEE_CLASS, component: <StudentClass /> },
  { router: StudentRoute.SEE_EXAM_CLASS, component: <StudentExamClass /> },
  { router: StudentRoute.SEE_EXAM, component: <PublicExam /> },
  { router: StudentRoute.DO_EXAM, component: <ExamTaking /> },
];

export const TeacherRouter: Router_Component[] = [
  { router: TeacherRoute.MANAGE_CLASS, component: <TeacherClass /> },
  { router: TeacherRoute.MANAGE_CLASS_DETAIL, component: <TeacherClassDetail /> },
  { router: TeacherRoute.MANAGE_EXAM, component: <TeacherExam /> },
];

export const AdminRouter: Router_Component[] = [
  { router: AdminRoute.DASHBOARD, component: <Statistic /> },
  { router: AdminRoute.MANAGE_PUBLIC_EXAM, component: <ManagePublicExam /> },
  { router: AdminRoute.MANAGE_USER, component: <ManageUser /> },
  //
];
