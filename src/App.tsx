import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from '@/pages/auth';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/auth' element={<AuthPage />} />
        <Route path='*' element={<Navigate to='/auth' replace />} />
      </Routes>
    </Router>
  );
};

export default App;
