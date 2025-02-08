import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

// import PrivateRoute from '@/components/common/private-route';
import globalAppStore from '@/stores/global-app-store';

import { AppRoute } from '@/constants';
import { AuthRoutes, MainRoutes } from '@/routes';

import '@/index.css';

const App = observer(() => {
  const { isConfigCorrect, missingConfigVars, token } = globalAppStore;

  if (!isConfigCorrect) {
    return (
      <div className="h-full min-h-screen grid content-center justify-center pb-20">
        <h2 className="text-red-500 font-bold">Не удалось загрузить параметры конфигурации:</h2>
        <ul className="list-disc my-4 ps-10 text-red-500">
          {missingConfigVars.map((item) => (
            <li key={item.name}>
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="h-full min-h-screen">
      <Router>
        <Routes>
          {!token && AuthRoutes()}
          {/* <Route element={<PrivateRoute isRedirect={!token} />}>{MainRoutes()}</Route> */}
          {MainRoutes()}
          <Route element={<Navigate replace to={AppRoute.WILDBERRIES_FEEDBACKS} />} path="*" />
        </Routes>
      </Router>
    </div>
  );
});

export default App;
