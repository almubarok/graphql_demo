import { Context } from '../../context';

export const author = async (parent: any, args: any, ctx: Context) => {
  const { id } = args;
  const doc = await ctx.prisma.author.findUnique({ where: { id } });
  return doc;
};

export const authors = async (parent: any, args: any, ctx: Context) => {
  const { take, skip } = args;
  const docs = await ctx.prisma.author.findMany({ skip, take });
  return docs;
};
