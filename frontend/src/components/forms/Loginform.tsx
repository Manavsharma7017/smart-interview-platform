import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/Button';
import { loginSchema } from '../../utils/validation';
import type { LoginRequest } from '../../types/types';

interface LoginFormProps {
  onSubmit: (data: LoginRequest) => Promise<void>;
  isLoading: boolean;
  title: string;
  isAdmin?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading, title, isAdmin = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="mt-2 text-gray-600">Welcome back! Please sign in to continue.</p>
      </div>

      <Input
        {...register('identifier')}
        label="Email or Username"
        type="text"
        icon={<Mail className="h-5 w-5" />}
        error={errors.identifier?.message}
        placeholder="Enter your email or username"
      />

      <div className="relative">
        <Input
          {...register('password')}
          label="Password"
          type={showPassword ? 'text' : 'password'}
          icon={<Lock className="h-5 w-5" />}
          error={errors.password?.message}
          placeholder="Enter your password"
        />
        <button
          type="button"
          className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>

      <Button
        type="submit" // ✅ Explicitly set to submit to prevent reload
        isLoading={isLoading}
        className="w-full"
        size="lg"
      >
        Sign In
      </Button>
    </form>
  );
};
