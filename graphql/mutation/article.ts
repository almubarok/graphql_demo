import { Context } from '../../context';

export const insertOneArticle = async (
  _p: any,
  { data }: any,
  ctx: Context
) => {
  try {
    const { title, content, author_id } = data;
    const author = await ctx.prisma.author.findUnique({
      where: { id: author_id },
    });
    if (!author) ctx.handleError(ctx.errors.invalidAuthor);

    const article = await ctx.prisma.article.create({
      data: { title, content, author_id },
    });

    ctx.pubsub.publish('article', {
      article: { mutation: 'CREATED', data: article },
    });

    return article;
  } catch (error) {
    ctx.catchError(error);
  }
};
