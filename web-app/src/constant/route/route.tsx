import Home from '../../page/Home';
import SignIn from '../../page/sign_in/SignIn';
import { GuestRoute, StudentRoute, TeacherRoute } from './name';

export interface Router_Component {
  router: string;
  component: JSX.Element;
}

export const GuestRouter: Router_Component[] = [
  { router: GuestRoute.HOME, component: <Home /> },
  //   { router: StudentRoute.USER_PROFILE, component: <Profile /> },
  //   { router: StudentRoute.USER_CART, component: <Cart /> },
  //   { router: StudentRoute.USER_HISTORY, component: <HistoryOrder /> },
  // define router
];

export const StudentRouter: Router_Component[] = [
  // { router: TeacherRoute.TEACHER_DASHBOARD, component: <SignIn /> },
  // { router: TeacherRoute.TEACHER_ORDER, component: <OrderList /> },
  // { router: TeacherRoute.TEACHER_CATEGORY, component: <Category /> },
  // { router: TeacherRoute.TEACHER_PRODUCT, component: <Product /> },
];

export const TeacherRouter: Router_Component[] = [
  // { router: TeacherRoute.TEACHER_DASHBOARD, component: <SignIn /> },
  // { router: TeacherRoute.TEACHER_ORDER, component: <OrderList /> },
  // { router: TeacherRoute.TEACHER_CATEGORY, component: <Category /> },
  // { router: TeacherRoute.TEACHER_PRODUCT, component: <Product /> },
];

export const AdminRouter: Router_Component[] = [
  // { router: TeacherRoute.TEACHER_DASHBOARD, component: <SignIn /> },
  // { router: TeacherRoute.TEACHER_ORDER, component: <OrderList /> },
  // { router: TeacherRoute.TEACHER_CATEGORY, component: <Category /> },
  // { router: TeacherRoute.TEACHER_PRODUCT, component: <Product /> },
];
