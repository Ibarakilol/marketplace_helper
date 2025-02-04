import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

// import PrivateRoute from '@/components/common/private-route';
import globalAppStore from '@/stores/global-app-store';

import { AppRoute } from '@/constants';
import { AuthRoutes, MainRoutes } from '@/routes';

import '@/scss/index.scss';

const App = observer(() => {
  const { isConfigCorrect, missingConfigVars, token } = globalAppStore;

  if (!isConfigCorrect) {
    return (
      <div className="app app_err">
        <h2 className="app__error-title">Не удалось загрузить параметры конфигурации:</h2>
        <ul className="app__error-list">
          {missingConfigVars.map((item) => (
            <li className="app__error-list-item" key={item.name}>
              <span className="app__error-text">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="app">
      <Router>
        <Routes>
          {!token && AuthRoutes()}
          {/* <Route element={<PrivateRoute isRedirect={!token} />}>{MainRoutes()}</Route> */}
          {MainRoutes()}
          <Route element={<Navigate replace to={AppRoute.WILDBERRIES} />} path="*" />
        </Routes>
      </Router>
    </div>
  );
});

export default App;
