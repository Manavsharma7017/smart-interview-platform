import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Brain, Users, User, ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { LoginForm } from '../components/forms/Loginform';
import { authState } from '../store/auth';
import { authService } from '../services/auth';
import { saveAuthData, getUserRole } from '../utils/auth';
import type { LoginRequest } from '../types/types';

export const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.get('admin') === 'true';
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const handleLogin = async (data: LoginRequest) => {
    try {
      setIsLoading(true);
      setError('');

      const response = isAdmin
        ? await authService.loginAdmin(data)
        : await authService.loginUser(data);

      const { token, user } = response;
      const role = getUserRole(user);

      saveAuthData(token, user);
      setAuth({
        user,
        token,
        isAuthenticated: true,
        role,
      });

      navigate('/app/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err?.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="text-center">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Brain className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="mt-4 text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Interview Prep
          </h1>
          <p className="mt-2 text-gray-600">Welcome back! Sign in to continue your journey.</p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <Link
            to="/login"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              !isAdmin ? 'bg-blue-100 text-blue-700 shadow-md' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <User className="h-4 w-4" />
            <span>User Login</span>
          </Link>
          <Link
            to="/login?admin=true"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              isAdmin ? 'bg-purple-100 text-purple-700 shadow-md' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={(e) => isLoading && e.preventDefault()}
          >
            <Users className="h-4 w-4" />
            <span>Admin Login</span>
          </Link>
        </div>

        <Card className="p-8">
          <LoginForm
            onSubmit={handleLogin}
            isLoading={isLoading}
            title={isAdmin ? 'Admin Sign In' : 'User Sign In'}
            isAdmin={isAdmin}
          />

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to={`/register${isAdmin ? '?admin=true' : ''}`}
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
