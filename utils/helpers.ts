import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { APP_SECRET, tokens } from './constants';

export const handleError = (error: any) => {
  // add any other logging mechanism here e.g. Sentry
  throw error;
};

export const catchError = (err: Error) => {
  console.log(err.stack);
};

export const generateAccessToken = (userId: number, role: string) => {
  const accessToken = sign(
    {
      userId,
      role,
      type: tokens.access.name,
      timestamp: Date.now(),
    },
    APP_SECRET,
    {
      expiresIn: tokens.access.expiry,
    }
  );
  return accessToken;
};

export const generatePassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) reject(err);
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) reject(err);
        else resolve(hash);
      });
    });
  });
};
