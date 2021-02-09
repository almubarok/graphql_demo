import { Context } from '../../context';

export const article = async (parent: any, args: any, ctx: Context) => {
  const { id } = args;
  const doc = await ctx.prisma.article.findUnique({ where: { id } });
  return doc;
};

export const articles = async (parent: any, args: any, ctx: Context) => {
  const { take, skip } = args;
  const docs = await ctx.prisma.article.findMany({ take, skip });
  return docs;
};
