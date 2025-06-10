import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { Brain, Users, User, ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { RegisterForm } from '../components/forms/RegisterForm';
import { authState } from '../store/auth';
import { authService } from '../services/auth';
import { saveAuthData, getUserRole } from '../utils/auth';
import type { RegisterRequest } from '../types/types';

export const RegisterPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const isAdmin = (searchParams.get('admin') ?? '') === 'true';

  const setAuth = useSetRecoilState(authState);

  const auth = useRecoilValue(authState);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/app/dashboard');
    }
  }, [auth, navigate]);

 

  const handleRegister = async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      setError('');

      const response = isAdmin
        ? await authService.registerAdmin({
            username: data.username,
            email: data.email,
            password: data.password,
            role: 'ADMIN', // Ensure the role is set for admin registration
          })
        : await authService.registerUser({
            name: data.username,
            email: data.email,
            password: data.password,
          });

      const { token, user } = response;
      const role = getUserRole(user);

      saveAuthData(token, user);
      setAuth({
        user,
        token,
        isAuthenticated: true,
        role,
      });


      navigate('/');
    
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred while registering. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Back to Home */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* App Branding */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Brain className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="mt-4 text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Interview Prep
          </h1>
          <p className="mt-2 text-gray-600">Join thousands preparing for success</p>
        </div>

        {/* Role Toggle Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <Link
            to="/register"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              !isAdmin ? 'bg-blue-100 text-blue-700 shadow-md' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={(e) => isLoading && e.preventDefault()}
          >
            <User className="h-4 w-4" />
            <span>User Registration</span>
          </Link>
          <Link
            to="/register?admin=true"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              isAdmin ? 'bg-purple-100 text-purple-700 shadow-md' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={(e) => isLoading && e.preventDefault()}
          >
            <Users className="h-4 w-4" />
            <span>Admin Registration</span>
          </Link>
        </div>

        {/* Form */}
        <Card className="p-8">
          <RegisterForm
            onSubmit={handleRegister}
            isLoading={isLoading}
            title={isAdmin ? 'Create Admin Account' : 'Create Your Account'}
            isAdmin={isAdmin}
          />

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

         
        

          {/* Login Redirect */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to={`/login${isAdmin ? '?admin=true' : ''}`}
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
