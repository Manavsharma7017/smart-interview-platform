import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/Button';
import { userRegisterSchema, adminRegisterSchema } from '../../utils/validation';
import type { RegisterRequest } from '../../types/types';
import type { ZodType } from 'zod';

interface RegisterFormProps {
  onSubmit: (data: RegisterRequest) => Promise<void>;
  isLoading: boolean;
  title: string;
  isAdmin?: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  isLoading,
  title,
  isAdmin = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const schema = useMemo(() => {
    return isAdmin ? adminRegisterSchema : userRegisterSchema;
  }, [isAdmin]) as ZodType<any, any, RegisterRequest>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="mt-2 text-gray-600">Create your account to get started.</p>
      </div>

      <Input
        {...register('username')}
        label={isAdmin ? 'Username' : 'Full Name'}
        type="text"
        icon={<User className="h-5 w-5" />}
        error={errors.username?.message}
        placeholder={isAdmin ? 'Enter your username' : 'Enter your full name'}
      />

      <Input
        {...register('email')}
        label="Email Address"
        type="email"
        icon={<Mail className="h-5 w-5" />}
        error={errors.email?.message}
        placeholder="Enter your email address"
      />

      <div className="relative">
        <Input
          {...register('password')}
          label="Password"
          type={showPassword ? 'text' : 'password'}
          icon={<Lock className="h-5 w-5" />}
          error={errors.password?.message}
          placeholder="Create a secure password"
        />
        <button
          type="button"
          className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>

      <Button type="submit" isLoading={isLoading} className="w-full" size="lg">
        Create Account
      </Button>
    </form>
  );
};
