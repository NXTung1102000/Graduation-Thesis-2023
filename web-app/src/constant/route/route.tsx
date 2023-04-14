import Home from '../../page/Home';
import SignIn from '../../page/SignIn';
import { StudentRoute, TeacherRoute } from './name';

export interface Router_Component {
  router: string;
  component: JSX.Element;
}

export const PublicRouter: Router_Component[] = [
  { router: StudentRoute.HOME, component: <Home /> },
  //   { router: StudentRoute.USER_PROFILE, component: <Profile /> },
  //   { router: StudentRoute.USER_CART, component: <Cart /> },
  //   { router: StudentRoute.USER_HISTORY, component: <HistoryOrder /> },
  // define router
];

export const PrivateRouter: Router_Component[] = [
  { router: TeacherRoute.TEACHER_DASHBOARD, component: <SignIn /> },
  // { router: TeacherRoute.TEACHER_ORDER, component: <OrderList /> },
  // { router: TeacherRoute.TEACHER_CATEGORY, component: <Category /> },
  // { router: TeacherRoute.TEACHER_PRODUCT, component: <Product /> },
];
