import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  Brain,
  Home,
  History,
  Settings,
  MessageSquare,
  LogOut,
  User,
  LogIn,
  
} from 'lucide-react';

import {
  authState,
  userSelector,
  isAdminSelector,
} from '../../store/auth';
import { authService } from '../../services/auth';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const user = useRecoilValue(userSelector);
  const isAdmin = useRecoilValue(isAdminSelector);
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    setAuth({
      user: null,
      token: null,
      isAuthenticated: false,
      role: null,
    });
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg group-hover:scale-105 transition-transform duration-200">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Interview Prep
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {!isAdmin&&<Link
              to="/app/dashboard"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>}
            <Link
              to="/app/admin/questions"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Question</span>
            </Link>
            <Link
              to="/app/history"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <History className="h-4 w-4" />
              <span>History</span>
            </Link>
            {isAdmin && (
              <Link
                to="/app/admin"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Auth Section */}
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                <User className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {user.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </Link>
             <Link to="/register">
              <Button size="sm">Get Started</Button>
              </Link>
          </div>)}
        </div>
      </div>
    </nav>
  );
};
