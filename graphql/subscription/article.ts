import { withFilter } from 'apollo-server';

import { Context } from '../../context';

export const article = {
  subscribe: withFilter(
    (parent: any, args: any, ctx: Context) => {
      return ctx.pubsub.asyncIterator('article');
    },
    (parent: any, args: any) => {
      if (args?.author_id) {
        return parent.article.data.author_id === args.author_id;
      }
      return true;
    }
  ),
};
