# Hackathon demo

## Getting started

- Install dependencies `yarn install`
- Create `.env` file so that prisma can read the environment variable. Not sure why it cannot read `.env.local` so we will live with this for now.
- Update `.env` with content of `env.example` file
- Run prisma migrate to populate tabels in your db based on schema.prisma `npx prisma migrate dev --name init`
- You can check your database that it now contains a couple of tables
- Run `npx prisma generate` to generate prisma client, so that you can query prisma orm