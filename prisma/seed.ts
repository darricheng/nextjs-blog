import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  const postOne = await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Post 1",
      content: "Content of Post 1",
      createdAt: new Date(),
      lastModifiedAt: new Date(),
    },
  });
  const postTwo = await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "Post 2",
      content: "Content of Post 2",
      createdAt: new Date(),
      lastModifiedAt: new Date(),
    },
  });
  console.log("Seeded the database with two posts");
  console.log({ postOne, postTwo });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
