import { PrismaClient } from '@prisma/client';
import { PubSub } from 'apollo-server';
import { verify } from 'jsonwebtoken';
import { APP_SECRET, tokens, errors } from './utils/constants';
import { catchError, handleError } from './utils/helpers';
import { TokenI } from './@types';
import * as loaders from './loader';

const prisma = new PrismaClient({ errorFormat: 'pretty' });
const pubsub = new PubSub();
export interface Context {
  errors: typeof errors;
  userId: number;
  prisma: PrismaClient;
  pubsub: PubSub;
  loaders: typeof loaders;
  catchError: (err: Error) => void;
  handleError: (err: Error) => void;
  request: {
    request: {
      headers: {
        authorization: string;
      };
    };
    connection: {
      context: {
        Authorization: string;
      };
    };
  };
}

export function createContext(ctx: any): Context {
  let userId: number;
  try {
    let Authorization = '';
    try {
      // for queries and mutations
      Authorization = ctx.request.headers.authorization;
    } catch (e) {
      // specifically for subscriptions as the above will fail
      Authorization = ctx?.connection?.context?.authorization;
    }
    const token = Authorization.split('Bearer ')[1];
    const verifiedToken = verify(token, APP_SECRET) as TokenI;
    if (!verifiedToken.userId && verifiedToken.type !== tokens.access.name) {
      userId = -1;
    } else {
      userId = verifiedToken.userId;
    }
  } catch (e) {
    userId = -1;
  }

  return {
    prisma,
    pubsub,
    request: ctx,
    userId,
    catchError,
    errors,
    handleError,
    loaders,
  };
}
