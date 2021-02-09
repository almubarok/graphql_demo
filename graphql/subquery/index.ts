import { Context } from '../../context';

export default {
  Article: {
    author: async (parent: any, args: any, ctx: Context) => {
      const doc = await ctx.prisma.author.findUnique({
        where: { id: parent.author_id },
      });
      return doc;
    },
  },
  Author: {
    articles: async (parent: any, args: any, ctx: Context) => {
      // const docs = await ctx.prisma.article.findMany({
      //   where: { author_id: parent.id },
      // });
      const docs = await ctx.loaders.articleLoader.load(parent.id);
      return docs;
    },
  },
};
