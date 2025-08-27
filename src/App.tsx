import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from '@/pages/auth';

const App = () => {
  // temporary proxy verification initial checkup.
  console.log(import.meta.env.VITE_API_URL);
  useEffect(() => {
    fetch('/api/healthcheck')
      .then(res => res.json())
      .then(data => console.log('API response: ', data))
      .catch(err => console.error('API error: ', err));
  }, []);

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
