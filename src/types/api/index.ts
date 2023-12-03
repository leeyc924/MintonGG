export * from './users';
export * from './game';
export * from './auth';

export interface FailureResponse {
  timestamp: number;
  status: number;
  error: string;
  message: string;
  path: string;
  code?: string;
}
