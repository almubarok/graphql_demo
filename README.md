# Getting started with GraphQL

## How to use

- run `yarn install` or `npm install`
- create `.env` file and add your database connection string
  - eg. `DATABASE_URL=postgresql://postgres:admin!@localhost:5432/graphql_demo?schema=public`
  - [see more](https://www.prisma.io/docs/reference/database-reference/connection-urls)
- run `npx prisma migrate dev --preview-feature`
- run `yarn dev` or `npm run dev`

### Next
- [Prisma Nexus](https://nexusjs.org/docs/plugins/prisma) Auto-generate type-definitions
- [Dataloader](https://github.com/graphql/dataloader) Solve N + 1 Problem