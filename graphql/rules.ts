import { Context } from '../context';

const isAuthenticatedUser = async (
  resolve: any,
  _parent: any,
  _args: any,
  ctx: Context,
  info: any
) => {
  try {
    if (ctx.userId === -1) {
      return ctx.handleError(ctx.errors.notAuthenticated);
    }

    const user = await ctx.prisma.author.findUnique({
      where: { id: ctx.userId },
    });
    if (!user) ctx.handleError(ctx.errors.notAuthenticated);

    const result = await resolve(_parent, _args, ctx, info);
    return result;
  } catch (e) {
    return e;
  }
};

export default {
  Query: {
    article: isAuthenticatedUser,
    articles: isAuthenticatedUser,
    author: isAuthenticatedUser,
    authors: isAuthenticatedUser,
  },
  Mutation: {
    insertOneArticle: isAuthenticatedUser,
    deleteOneArticle: isAuthenticatedUser,
  },
  Subscription: {
    article: isAuthenticatedUser,
  },
};
