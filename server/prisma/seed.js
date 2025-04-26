const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Create admin user
    await prisma.user.create({
      data: {
        username: 'admin',
        password: 'admin',
        email: 'admin@example.com',
        role: 'administrator',
        lastLogin: new Date()
      }
    });
    console.log('Admin user created successfully');

    // Create sample product
    await prisma.product.create({
      data: {
        title: 'Тестовый продукт',
        description: 'Описание тестового продукта',
        imageUrl: '/img/products/placeholder.jpg',
        category: 'spare-parts',
        application: 'pellets',
        granulation: 'granulation',
        type: 'flat'
      }
    });
    console.log('Sample product created successfully');

    // Create sample log
    await prisma.log.create({
      data: {
        type: 'info',
        message: 'Система инициализирована',
        user: 'system',
        ip: '127.0.0.1',
        timestamp: new Date(),
        metadata: {}
      }
    });
    console.log('Sample log created successfully');

  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 