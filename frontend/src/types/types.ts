export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER';
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  username: string;
  role: 'ADMIN' | 'EDITOR';
}

export interface Domain {
  id: number;
  name: string;
  description: string;
}

export interface Question {
  id: string;
  text: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  domains: Domain;
  domain_id: number;
  created_at: string;
}

export interface InterviewSession {
  id: string;
  user_id: string;
  domain_id: number;
  started_at: string;
  completed_at?: string;
}

export interface Response {
  response_id: string;
  session_id: string;
  question_id: string;
  user_question_id: string;
  answer: string;
  submitted_at: string;
}

export interface Feedback {
  id: string;
  response_id: string;
  clarity: string;
  tone: string;
  relevance: string;
  overall_score: string;
  suggestion: string;
}

export interface AuthState {
  user: User | AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  role: 'USER' | 'ADMIN' | 'EDITOR' | null;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface CreateSessionRequest {
  domain_id: number;
}

export interface CreateResponseRequest {
  session_id: string;
  question_id: string;
  user_question_id: string;
  answer: string;
}

export interface FeedbackRequest {
  responce_id: string;
  question: string;
  answer: string;
  user_id: string;
}