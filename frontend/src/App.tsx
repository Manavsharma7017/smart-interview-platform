
  import { RecoilRoot, useSetRecoilState } from 'recoil';
  import './App.css'
  import { authState } from './store/auth';
  import { useEffect, useState } from 'react';
  import { getStoredAuthData, getUserRole } from './utils/auth';
  import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
  import {LoginPage} from './pages/LoginPage';
  import {RegisterPage }from './pages/RegisterPage';
  import {LandingPage} from './pages/LandingPage';
  import { ProtectedRoute } from './components/auth/Protected';
  import {Layout} from './components/layout/Layout';
  import DashboardPage from './pages/DashboardPage';
  import InterviewPage from './pages/InterviewPage';
  import HistoryPage from './pages/HistoryPage';
  import {AdminPage} from './pages/AdminPage';
import { QuestionPage } from './pages/QuestionPagee';

  const AppContent: React.FC = () => {
    const setAuth = useSetRecoilState(authState);
      const [loading, setLoading] = useState(true); 
    useEffect(() => {
      // Initialize auth state from localStorage
      const { token, user } = getStoredAuthData();
      if (token && user) {
        const role = getUserRole(user);
        setAuth({
          user,
          token,
          isAuthenticated: true,
          role,
        });
      }
      setLoading(false); 
    }, [setAuth]);
     if (loading) return (
  <div className="flex flex-col items-center justify-center min-h-96 space-y-4">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    <div className="text-xl font-medium text-gray-700">Loading, please wait...</div>
  </div>
);

    return (
    <Router>
  <Routes>
    {/* Public */}
    <Route element={<Layout />}>
      <Route index element={<LandingPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Route>

    {/* Protected */}
    <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
      <Route index element={<Navigate to="/app/dashboard" replace />} />
      <Route path="question" element={<QuestionPage/>} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="interview/:sessionId" element={<InterviewPage />} />
      <Route path="history" element={<HistoryPage />} />
      <Route path="admin/*" element={
        <ProtectedRoute requireAdmin>
          <AdminPage />
        </ProtectedRoute>
      } />
    </Route>

    {/* Fallback */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
</Router>

    );
  };

  function App() {
    return (
      <RecoilRoot>
        <AppContent />
      </RecoilRoot>
    );
  }
  export default App
