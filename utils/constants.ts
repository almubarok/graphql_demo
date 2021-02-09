import { AuthenticationError, UserInputError } from 'apollo-server';

export const tokens = {
  access: {
    name: 'ACCESS_TOKEN',
    expiry: '1d',
  },
};

export const APP_SECRET = process.env.APP_SECRET || 'secretkey';

export const errors = {
  notAuthenticated: new AuthenticationError('Unauthenticated user!'),
  authorAlreadyExists: new UserInputError('User already exists!'),
  invalidAuthor: new UserInputError('Author not valid!'),
};

export interface prismaErrorI {
  code: string;
  message: string;
  meta?: {
    target: [string];
  };
  stack?: string;
}

export const isDev = () => process.env.NODE_ENV === 'development';
