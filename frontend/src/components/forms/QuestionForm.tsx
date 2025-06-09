import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


import { Button } from '../ui/Button';
import { questionSchema } from '../../utils/validation';
import type { Question, Domain } from '../../types/types';

interface QuestionFormData {
  text: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  domain_id: number;
}

interface QuestionFormProps {
  onSubmit: (data: QuestionFormData) => Promise<void>;
  isLoading: boolean;
  domains: Domain[];
  initialData?: Partial<Question>;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  onSubmit,
  isLoading,
  domains,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Question Text
        </label>
        <textarea
          {...register('text')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter the interview question..."
        />
        {errors.text && (
          <p className="mt-1 text-sm text-red-600">{errors.text.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Difficulty Level
        </label>
        <select
          {...register('difficulty')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select difficulty</option>
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Hard</option>
        </select>
        {errors.difficulty && (
          <p className="mt-1 text-sm text-red-600">{errors.difficulty.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Domain
        </label>
        <select
          {...register('domain_id', { valueAsNumber: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select domain</option>
          {domains.map((domain) => (
            <option key={domain.id} value={domain.id}>
              {domain.name}
            </option>
          ))}
        </select>
        {errors.domain_id && (
          <p className="mt-1 text-sm text-red-600">{errors.domain_id.message}</p>
        )}
      </div>

      <Button type="submit" isLoading={isLoading} className="w-full">
        {initialData ? 'Update Question' : 'Create Question'}
      </Button>
    </form>
  );
};