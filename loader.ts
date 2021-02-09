import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

const prisma = new PrismaClient({ errorFormat: 'pretty' });

export const articleLoader = new DataLoader(
  async (author_ids: readonly number[]) => {
    const articles = await prisma.article.findMany({
      where: { author_id: { in: <number[]>author_ids } },
    });
    return author_ids.map((author_id) => {
      return articles.filter((article) => article.author_id === author_id);
    });
  }
);

// https://github.com/graphql/dataloader
// https://levelup.gitconnected.com/solve-n-1-query-problem-in-graphql-with-dataloaders-18e16ac17b21
