# NextJS Blog

This is a sample blog project for me to explore and better understand some of the basic features of NextJS. It is meant to be a standalone app using only NextJS, with Postgres as the database.

## Running the app locally

I use pnpm as my package manager, so [install it](https://pnpm.io/installation) first if you don't have it.

1. Install all the dependencies for the project using `pnpm install`.
2. Create a `.env.local` file, then copy the `.env.sample` file contents over to `.env.local`. The `BASE_URL`s should point to the locally running instance of the app (which should be `localhost:3000`), and the `DATABASE_URL` to your local instance of Postgres.
3. Seed the database with some dummy data using `pnpm exec prisma db seed`.
4. Run the app using `pnpm run dev`.
5. Open up your browser at `localhost:3000` to view the app.

## Deploying the app to Vercel

1. Follow the [instructions on Vercel](https://nextjs.org/learn/basics/deploying-nextjs-app) for deploying your NextJS app with Vercel.
2. Follow the instructions for a setting up a Postgres database with Vercel, or set up one with your provider of choice.
3. Change the environment variables for the blog app so that it can read and write data from and to the database.
