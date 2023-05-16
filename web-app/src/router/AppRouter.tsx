import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AccountRouter, AdminRouter, GuestRouter, StudentRouter, TeacherRouter } from '../constant/route/route';
import { selectAuth } from '../page/account/AuthSlice';
import { Counter } from '../page/counter/Counter';
import Layout from '../page/Layout';
import { useAppSelector } from '../store/hook';

const AppRouter = () => {
  const auth = useAppSelector(selectAuth);
  return (
    <BrowserRouter>
      <Routes>
        {GuestRouter.map((router) => (
          <Route key={router.router} path={router.router} element={<Layout>{router.component}</Layout>} />
        ))}
        {auth.access_token &&
          AccountRouter.map((router) => (
            <Route key={router.router} path={router.router} element={<Layout>{router.component}</Layout>} />
          ))}
        {auth.access_token &&
          StudentRouter.map((router) => (
            <Route key={router.router} path={router.router} element={<Layout>{router.component}</Layout>} />
          ))}
        {auth.access_token &&
          auth.user.role === 2 &&
          TeacherRouter.map((router) => (
            <Route key={router.router} path={router.router} element={<Layout>{router.component}</Layout>} />
          ))}
        {auth.access_token &&
          auth.user.role === 0 &&
          AdminRouter.map((router) => (
            <Route key={router.router} path={router.router} element={<Layout>{router.component}</Layout>} />
          ))}

        <Route path="/counter" element={<Counter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
