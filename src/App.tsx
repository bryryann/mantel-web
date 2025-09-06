import { BrowserRouter as Router, Routes, Route /*, Navigate */ } from 'react-router-dom';
import PublicRoute from '@/components/routes/PublicRoute';
import PrivateRoute from '@/components/routes/PrivateRoute';
import AuthPage from '@/pages/auth';
import DashboardPage from '@/pages/dashboard';
import { NotFound } from '@/pages/errors';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route(s) accessible only for unauthenticated users. */}
        <Route
          path='/auth'
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        ></Route>

        {/* Route(s) accessible only for authenticated users. */}
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        ></Route>

        {/* Route(s) accessible both by authenticated and unauthenticated users. */}

        {/* Catch-all route */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
