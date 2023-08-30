# NextJS Blog

This is a sample blog project for me to explore and better understand some of the basic features of NextJS. It is meant to be a standalone app using only NextJS, with Postgres as the database.

## Developing locally

I use pnpm as my package manager, so [install it](https://pnpm.io/installation) first if you don't have it.

1. Install all the dependencies for the project using `pnpm install`.
2. Create a `.env.local` file, then copy the `.env.sample` file contents over to `.env.local`. The `BASE_URL`s should point to the locally running instance of the app (which should be `localhost:3000`), and the `POSTGRES_URL`s to your local instance of Postgres.
3. Create the database with `pnpm run db:push`.
4. Seed the database with some dummy data using `pnpm exec prisma db seed`.
5. Run the app using `pnpm run dev`.
6. Open up your browser at `localhost:3000` to view the app.

## Deploying the app to Vercel

1. [Create a new NextJS project](https://vercel.com/docs/projects/overview#creating-a-project) with Vercel. You can do this by [linking your remote repository](https://vercel.com/docs/deployments/git#deploying-a-git-repository) directly to Vercel.
2. Follow the [instructions](https://vercel.com/docs/storage/vercel-postgres/quickstart) for a setting up a Postgres database with Vercel. After step 3, rename `.env.development.local` to `.env.production.local`.
3. Run the command `pnpm run migrate:production` to set up your database with Prisma. Your database should be seeded with some dummy data.
4. Set the following two environment variables (`VERCEL_URL` & `NEXT_PUBLIC_VERCEL_URL`) for your project to the deployed app domain (e.g. `nextjs-blog-yourusername.vercel-app`).
5. Visit your website at the deployed app doamin!
