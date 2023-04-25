import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AdminRouter, GuestRouter, StudentRouter, TeacherRouter } from '../constant/route/route';
import { Counter } from '../page/counter/Counter';
import Layout from '../page/Layout';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {GuestRouter.map((router) => (
          <Route key={router.router} path={router.router} element={<Layout>{router.component}</Layout>} />
        ))}
        {StudentRouter.map((router) => (
          <Route key={router.router} path={router.router} element={router.component} />
        ))}
        {TeacherRouter.map((router) => (
          <Route key={router.router} path={router.router} element={router.component} />
        ))}
        {AdminRouter.map((router) => (
          <Route key={router.router} path={router.router} element={router.component} />
        ))}

        <Route path="/counter" element={<Counter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
