import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AccountRouter, AdminRouter, GuestRouter, StudentRouter, TeacherRouter } from '../constant/route/route';
import { Counter } from '../page/counter/Counter';
import Layout from '../page/Layout';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {GuestRouter.map((router) => (
          <Route key={router.router} path={router.router} element={<Layout>{router.component}</Layout>} />
        ))}
        {AccountRouter.map((router) => (
          <Route key={router.router} path={router.router} element={<Layout>{router.component}</Layout>} />
        ))}
        {StudentRouter.map((router) => (
          <Route key={router.router} path={router.router} element={<Layout>{router.component}</Layout>} />
        ))}
        {TeacherRouter.map((router) => (
          <Route key={router.router} path={router.router} element={<Layout>{router.component}</Layout>} />
        ))}
        {AdminRouter.map((router) => (
          <Route key={router.router} path={router.router} element={<Layout>{router.component}</Layout>} />
        ))}

        <Route path="/counter" element={<Counter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
