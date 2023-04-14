import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PrivateRouter, PublicRouter } from '../constant/route/route';
import { Counter } from '../page/counter/Counter';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {PublicRouter.map((router) => (
          <Route key={router.router} path={router.router} element={router.component} />
        ))}
        {PrivateRouter.map((router) => (
          <Route key={router.router} path={router.router} element={router.component} />
        ))}

        <Route path="/counter" element={<Counter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
