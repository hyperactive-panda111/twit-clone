import { PrismaClient } from './db/generated/prisma';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with dummy data...');
  
  // Create 5 dummy users
  const users = [];
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        username: faker.internet.userName().toLowerCase().replace(/[^a-z0-9]/g, ''),
        displayName: faker.person.fullName(),
        name: faker.person.fullName(),
        bio: faker.lorem.paragraph(),
        location: `${faker.location.city()}, ${faker.location.country()}`,
        job: faker.person.jobTitle(),
        website: faker.internet.url(),
        img: faker.image.avatar(),
        cover: faker.image.url({width: 1920,height: 1080}),
      },
    });
    users.push(user);
  }
  console.log(`👤 Created ${users.length} users`);
  
  // Create 20 dummy posts
  const posts = [];
  for (let i = 0; i < 20; i++) {
    const post = await prisma.post.create({
      data: {
        userId: users[faker.number.int({ min: 0, max: 4 })].id, // Assign random user to the post
        desc: faker.lorem.paragraph(),
        img: i % 2 === 0 ? faker.image.url() : null,
        vid: i % 5 === 0 ? faker.internet.url() : null,
        isSensitive: faker.datatype.boolean(),
        createdAt: faker.date.recent({ days: 30 }),
      },
    });
    posts.push(post);
  }
  console.log(`📝 Created ${posts.length} posts`);
  
  // Create 10 comments (which are also posts)
  const comments = [];
  for (let i = 0; i < 10; i++) {
    const comment = await prisma.post.create({
      data: {
        userId: users[faker.number.int({ min: 0, max: 4 })].id,
        desc: faker.lorem.sentence(),
        parentPostId: posts[faker.number.int({ min: 0, max: posts.length - 1 })].id,
        createdAt: faker.date.recent({ days: 15 }),
      },
    });
    comments.push(comment);
  }
  console.log(`💬 Created ${comments.length} comments`);
  
  // Create 5 reposts
  const reposts = [];
  for (let i = 0; i < 5; i++) {
    const repost = await prisma.post.create({
      data: {
        userId: users[faker.number.int({ min: 0, max: 4 })].id,
        desc: faker.helpers.arrayElement([null, faker.lorem.sentence()]),
        rePostId: posts[faker.number.int({ min: 0, max: posts.length - 1 })].id,
        createdAt: faker.date.recent({ days: 10 }),
      },
    });
    reposts.push(repost);
  }
  console.log(`🔄 Created ${reposts.length} reposts`);
  
  // Combine all post types for like and save operations
  const allPosts = [...posts, ...comments, ...reposts];
  
  // Create dummy likes for posts
  const likes = [];
  for (let i = 0; i < 50; i++) {
    try {
      const userId = users[faker.number.int({ min: 0, max: 4 })].id;
      const postId = allPosts[faker.number.int({ min: 0, max: allPosts.length - 1 })].id;
      
      // Check if this like already exists to avoid unique constraint violations
      const existingLike = await prisma.like.findFirst({
        where: {
          userId: userId,
          postId: postId,
        },
      });
      
      if (!existingLike) {
        const like = await prisma.like.create({
          data: {
            userId: userId,
            postId: postId,
            createdAt: faker.date.recent({ days: 20 }),
          },
        });
        likes.push(like);
      }
    } catch (error) {
      console.log('Skipping duplicate like');
    }
  }
  console.log(`👍 Created ${likes.length} likes`);
  
  // Create dummy saved posts
  const savedPosts = [];
  for (let i = 0; i < 15; i++) {
    try {
      const userId = users[faker.number.int({ min: 0, max: 4 })].id;
      const postId = allPosts[faker.number.int({ min: 0, max: allPosts.length - 1 })].id;
      
      // Check if this saved post already exists
      const existingSave = await prisma.savedPosts.findFirst({
        where: {
          userId: userId,
          postId: postId,
        },
      });
      
      if (!existingSave) {
        const savedPost = await prisma.savedPosts.create({
          data: {
            userId: userId,
            postId: postId,
            createdAt: faker.date.recent({ days: 25 }),
          },
        });
        savedPosts.push(savedPost);
      }
    } catch (error) {
      console.log('Skipping duplicate saved post');
    }
  }
  console.log(`🔖 Created ${savedPosts.length} saved posts`);
  
  // Create dummy follows
  const follows = [];
  for (let i = 0; i < 10; i++) {
    try {
      let followerId, followingId;
      
      do {
        followerId = users[faker.number.int({ min: 0, max: 4 })].id;
        followingId = users[faker.number.int({ min: 0, max: 4 })].id;
      } while (followerId === followingId); // Ensure user is not following themselves
      
      // Check if this follow already exists
      const existingFollow = await prisma.follow.findFirst({
        where: {
          followerId: followerId,
          followingId: followingId,
        },
      });
      
      if (!existingFollow) {
        const follow = await prisma.follow.create({
          data: {
            followerId: followerId,
            followingId: followingId,
            createdAt: faker.date.past({ years: 1 }),
          },
        });
        follows.push(follow);
      }
    } catch (error) {
      console.log('Skipping duplicate follow');
    }
  }
  console.log(`👥 Created ${follows.length} follows`);
  
  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });