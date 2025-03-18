// seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedUsers() {
  // Create a regular user
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {
      email: 'user@example.com',
      name: 'John',
      phoneNumber: "09078747834"
    },
    create: {
      email: 'user@example.com',
      name: 'John',
      phoneNumber: "09078747834"
    },
  });
  console.log(`User created: ${user.email}`);

}


async function main() {
  try {
    await seedUsers();

    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


  