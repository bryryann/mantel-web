import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Modal } from '@/components/shared';
import { NewPostForm } from '@/components/posts';
import PublicRoute from '@/components/routes/PublicRoute';
import PrivateRoute from '@/components/routes/PrivateRoute';
import { AuthPage } from '@/pages/auth';
import { DashboardPage } from '@/pages/dashboard';
import { NotFound } from '@/pages/errors';
import { ProfilePage } from '@/pages/profile';
import { SettingsPage } from '@/pages/settings';
import { selectIsAuthenticated } from '@/features/auth/authSelectors';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
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

          <Route
            path='/settings'
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          ></Route>

          {/* Route(s) accessible both by authenticated and unauthenticated users. */}
          <Route
            path='/profile/:id'
            element={
              <ProfilePage />
            }
          ></Route>


          {/* Error routes and reroutes */}
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Navigate to='/dashboard' replace />}></Route>
        </Routes>
      </Router>

      {isAuthenticated && (
        <button
          className='floating-new-post-btn'
          onClick={() => setIsModalOpen(true)}
        >
          + New Post
        </button>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NewPostForm />
      </Modal>

      <ToastContainer
        position='bottom-left'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  );
};

export default App;
