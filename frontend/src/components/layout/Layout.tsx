
import React from 'react';
import { Outlet } from 'react-router-dom';
import {Navbar}  from './Navbar';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};