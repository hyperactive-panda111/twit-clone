import { PrismaClient } from './db/generated/prisma';
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Clearing old data...");
  await prisma.like.deleteMany();
  await prisma.savedPosts.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  console.log("👥 Creating users...");
  const users = [];
  for (let i = 0; i < 15; i++) {
    const user = await prisma.user.create({
      data: {
        id: `uid-${i + 1}`,
        email: faker.internet.email(),
        username: faker.internet.userName().toLowerCase().replace(/[^a-z0-9]/g, ''),
        displayName: faker.person.fullName(),
        bio: faker.lorem.sentence(),
        img: faker.image.avatar(),
        location: faker.location.city(),
        job: faker.person.jobTitle(),
        website: faker.internet.url(),
      },
    });
    users.push(user);
  }

  console.log("📝 Creating posts...");
  const posts = [];
  for (const user of users) {
    const numPosts = faker.number.int({ min: 1, max: 5 });
    for (let i = 0; i < numPosts; i++) {
      const post = await prisma.post.create({
        data: {
          desc: faker.lorem.sentence(),
          img: faker.image.urlPicsumPhotos(),
          userId: user.id,
          isSensitive: faker.datatype.boolean(0.1), // ~10% sensitive
        },
      });
      posts.push(post);
    }
  }

  console.log("❤️ Adding likes...");
  for (const post of posts) {
    const numLikes = faker.number.int({ min: 0, max: users.length });
    const likers = faker.helpers.arrayElements(users, numLikes);
    for (const liker of likers) {
      await prisma.like.create({
        data: {
          userId: liker.id,
          postId: post.id,
        },
      });
    }
  }

  console.log("🔖 Adding saves...");
  for (const post of posts) {
    const numSaves = faker.number.int({ min: 0, max: 5 });
    const savers = faker.helpers.arrayElements(users, numSaves);
    for (const saver of savers) {
      await prisma.savedPosts.create({
        data: {
          userId: saver.id,
          postId: post.id,
        },
      });
    }
  }

  console.log("🔗 Adding follows...");
  for (const user of users) {
    const numFollows = faker.number.int({ min: 1, max: 5 });
    const following = faker.helpers.arrayElements(users.filter(u => u.id !== user.id), numFollows);
    for (const followee of following) {
      await prisma.follow.create({
        data: {
          followerId: user.id,
          followingId: followee.id,
        },
      });
    }
  }

  console.log("✅ Seeding finished! Users:", users.length, "Posts:", posts.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
